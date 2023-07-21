const { LOG_DATA_STREAM } = process.env;
import { APIGatewayProxyEvent } from "aws-lambda";
import { Kinesis } from "aws-sdk";
import { middyfy } from "@libs/lambda";

const kinesis = new Kinesis();

const createLogLivestream = async (event) => {
  try {
    console.log("event::", event);

    const params = {
      Data: JSON.stringify({
        postId: event.body.postId,
        userId: event.body.userId,
        streamId: event.body.streamId,
      }),
      PartitionKey: event.body.postId,
      StreamName: LOG_DATA_STREAM,
    };

    await kinesis.putRecord(params).promise()
      .then((data) => {
        console.log("Kinesis response::", data);
      }) .catch((error) => {
        console.log("Error putting record in Kinesis data stream::", error);
      })
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data sent to Kinesis Data Stream successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error,
      }),
    };
  }
};

export const main = middyfy(createLogLivestream);
