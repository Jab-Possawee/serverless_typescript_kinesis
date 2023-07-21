import type { AWS } from "@serverless/typescript";
import kinesis from "./resources/kinesis";
import { createLogLivestream } from "@functions/livestreams";

const serverlessConfiguration: AWS = {
  service: "poc-kinesis",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-prune-plugin",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-southeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      REGION: "${self:custom.region}",
      STAGE: "${self:custom.stage}",
      LOG_DATA_STREAM: "${self:custom.logDataStream}",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "kinesis:PutRecord",
              "kinesis:DescribeStream",
              "kinesis:DeleteStream",
              "kinesis:UpdateShardCount",
            ],
            Resource: [{ "Fn::GetAtt": ["LogDataStream", "Arn"] }],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { createLogLivestream },
  package: { individually: true },
  custom: {
    prune: {
      automatic: true,
      number: 1,
    },
    region: "${aws:region}",
    stage: "${sls:stage}",
    logDataStream: "${self:service}-log-data-stream-${sls:stage}",

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...kinesis,
    },
  },
};

module.exports = serverlessConfiguration;
