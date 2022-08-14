import { EggDB } from "./../../eggs/main";
import { ServerResponse, IncomingMessage } from "http";
import { getDB } from "../../db/main";
import { createDataRes, writeToRes } from "../../server/return";

export async function eggsGet(_: IncomingMessage, res: ServerResponse) {
  const eDB = (await getDB("eggs")) as EggDB;

  writeToRes(res, createDataRes(eDB, true));
}
