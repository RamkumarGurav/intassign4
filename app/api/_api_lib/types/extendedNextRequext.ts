import { NextRequest } from "next/server";

export interface ExtendedNextRequest extends NextRequest {
  locals?: any;
}
