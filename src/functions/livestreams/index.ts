import { handlerPath } from "@libs/handler-resolver";

export const createLogLivestream = {
  handler: `${handlerPath(__dirname)}/createLogLivestream.main`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/logDataStream",
      },
    },
  ],
};