import { EggDB, isEggEntry } from "./../../eggs/main";
import { ServerResponse, IncomingMessage } from "http";
import { commitChanges, getDB } from "../../db/main";
import url from "url";
import { createErrorRes, writeToRes } from "../../server/return";

export async function EggsRegister(req: IncomingMessage, res: ServerResponse) {
  const eDB = (await getDB("eggs")) as EggDB;
  const query = url.parse(req.url as string, true).query;
  const data = atob(query["data"] as string);

  if (!isEggEntry(data)) {
    res.statusCode = 400;
    
    writeToRes(
      res,
      createErrorRes(
        "Invalid data",
        "The JSON data provided is not formulated correctly."
      )
    );

    return;
  }

  const json = JSON.parse(data);
  const id = Math.floor(Math.random() * 1e10);

  eDB[`${id}`] = { ...json, id };

  commitChanges("register egg", res, true, { db: "eggs", data: eDB });
}
