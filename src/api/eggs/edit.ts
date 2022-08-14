import { EggDB, isEggEntry } from "./../../eggs/main";
import { ServerResponse, IncomingMessage } from "http";
import { commitChanges, getDB } from "../../db/main";
import { createErrorRes, writeToRes } from "../../server/return";
import url from "url";

export async function EggsEdit(req: IncomingMessage, res: ServerResponse) {
  const eDB = (await getDB("eggs")) as EggDB;
  const query = url.parse(req.url as string, true).query;
  const data = atob(query["data"] as string);

  let id = query["id"] as string | number;

  try {
    id = parseInt(id as string);
  } catch {
    res.statusCode = 400;

    writeToRes(
      res,
      createErrorRes("Can't edit Egg Entry", "The ID could not be parsed.")
    );

    return;
  }

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

  eDB[`${id}`] = { ...JSON.parse(data), id };

  commitChanges("edit Egg Entry", res, true, { db: "eggs", data: eDB });
}
