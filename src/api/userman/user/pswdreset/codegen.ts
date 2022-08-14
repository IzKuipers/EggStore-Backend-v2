import url from "url";
import { ServerResponse, IncomingMessage } from "http";
import { commitChanges, getDB } from "../../../../db/main";
import { PasswordResetDB } from "../../../../pswdreset/main";
import { userExists } from "../../../../auth/user";
import { createErrorRes, writeToRes } from "../../../../server/return";

export async function UserPswdResetCodeGen(
  req: IncomingMessage,
  res: ServerResponse
) {
    const db = (await getDB("pswdreset")) as PasswordResetDB;
    const query = url.parse(req.url as string, true).query;
    const user = atob(query["user"] as string) as string;
  
  console.log(db, user, db[user]);

  const code = Math.floor(Math.random() * 1e9).toString();

  if (!userExists(user)) {
    res.statusCode = 400;
    
    writeToRes(
      res,
      createErrorRes("Can't create reset code", "The user doesn't exist.")
    );

    return;
  }

  db[user].push(code);

  commitChanges("create reset code", res,true, { db: "pswdreset", data: db });
}
