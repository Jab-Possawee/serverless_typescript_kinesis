export default {
  LogDataStream: {
    Type: "AWS::Kinesis::Stream",
    Properties: {
      Name: "${self:provider.environment.LOG_DATA_STREAM}", 
      ShardCount: 1, 
    },
  },
};
