import { IncomingMessage, ServerResponse } from "http";
import { getAuth } from "../../auth/get";
import { createDataRes, writeToRes } from "../../server/return";

export async function Login(req: IncomingMessage, res: ServerResponse) {
  const { username } = getAuth(req);

  writeToRes(res, createDataRes({ username }, true));
}