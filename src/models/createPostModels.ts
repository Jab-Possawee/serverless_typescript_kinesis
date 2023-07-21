export interface createlivestreamProps {
  postId: string;
  userId: string;
  streamId: string;
}
export enum LivestreamStatus {
  STATUS_WATCHING = "watching",
  STATUS_LEFT = "left",
}

export interface IcreateLivestream extends createlivestreamProps{
  status: LivestreamStatus;
  timestamp: number;
}

