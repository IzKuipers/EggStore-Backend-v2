import { IncomingMessage, ServerResponse } from "http";
import url from "url";
import { getAuth } from "../../../auth/get";
import { commitChanges, getDB, setDB } from "../../../db/main";
import {
  createDataRes,
  createErrorRes,
  writeToRes,
} from "../../../server/return";

export const bannedSetters = ["role", "disabled", "banned"];

export async function prefDelete(req: IncomingMessage, res: ServerResponse) {
  const query = url.parse(req.url as string, true).query;
  const pdb = (await getDB("pref")) as { [key: string]: any };
  const { username } = getAuth(req);

  const item = query["item"] as string;

  if (!bannedSetters.includes(atob(item))) {
    delete pdb[username][atob(item)];

    commitChanges("delete preference", res,true, { db: "pref", data: pdb });
  } else {
    writeToRes(
      res,
      createErrorRes(
        "Write not allowed",
        "You can't delete a read-only preference."
      )
    );

    return;
  }

  writeToRes(
    res,
    createErrorRes("Completed", "Request processed successfully.", true)
  );

  return;
}
