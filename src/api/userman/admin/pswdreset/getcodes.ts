import { PasswordResetDB } from "./../../../../pswdreset/main";
import { ServerResponse, IncomingMessage } from "http";
import { getDB } from "../../../../db/main";
import { createDataRes, writeToRes } from "../../../../server/return";
export async function adminPasswordResetGetCodes(
  _: IncomingMessage,
  res: ServerResponse
) {
  const db = (await getDB("pswdreset")) as PasswordResetDB;

  writeToRes(res, createDataRes(db, true));
}
