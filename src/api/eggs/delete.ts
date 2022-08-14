import { EggDB } from "./../../eggs/main";
import { commitChanges, getDB } from "../../db/main";
import { ServerResponse, IncomingMessage } from "http";
import url from "url";
import { createErrorRes, writeToRes } from "../../server/return";

export async function EggsDelete(req: IncomingMessage, res: ServerResponse) {
  const eDB = (await getDB("eggs")) as EggDB;
  const query = url.parse(req.url as string, true).query;
  let id = query["id"] as string | number;

  try {
    id = parseInt(id as string);
  } catch {
    res.statusCode = 400;

    writeToRes(
      res,
      createErrorRes("Can't delete Egg Entry", "The ID could not be parsed.")
    );

    return;
  }

  delete eDB[`${id}`];

  commitChanges("delete Egg Entry", res, true, { db: "eggs", data: eDB });
}
