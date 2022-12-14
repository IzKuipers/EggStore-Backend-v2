import { IncomingMessage, ServerResponse } from "http";
import { getAuth } from "../../../auth/get";
import { commitChanges, getDB, setDB } from "../../../db/main";

export async function userDelete(req: IncomingMessage, res: ServerResponse) {
  const { username } = getAuth(req);

  const cdb = (await getDB("cred")) as { [key: string]: string };
  const pdb = (await getDB("pref")) as { [key: string]: any };

  delete cdb[username];
  delete pdb[username];

  commitChanges(
    "delete user",
    res,true,
    { db: "cred", data: cdb },
    { db: "pref", data: pdb }
  );
}
