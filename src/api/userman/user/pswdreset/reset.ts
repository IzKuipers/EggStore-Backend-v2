import { ServerResponse } from "http";
import { IncomingMessage } from "http";
import url from "url";
import { userExists } from "../../../../auth/user";
import { commitChanges, getDB } from "../../../../db/main";
import { PasswordResetDB } from "../../../../pswdreset/main";
import { createErrorRes, writeToRes } from "../../../../server/return";
import argon2 from "argon2";

export async function passwordResetReset(
  req: IncomingMessage,
  res: ServerResponse
) {
  const db = (await getDB("pswdreset")) as PasswordResetDB;
  const cdb = (await getDB("cred")) as { [key: string]: string };
  const query = url.parse(req.url as string, true).query;
  const user = atob(query["user"] as string) as string;
  const code = atob(query["code"] as string) as string;
  const newP = atob(query["new"] as string) as string;

  if (!userExists(user)) {
    res.statusCode = 400;

    writeToRes(
      res,
      createErrorRes(
        "Can't verify reset code",
        "Can't verify the reset code for a user that doesn't exist."
      )
    );

    return;
  }

  const pswd = await argon2.hash(newP, {
    type: argon2.argon2i,
    memoryCost: 2 ** 10,
    timeCost: 2,
    hashLength: 16,
  });

  if (db[user].includes(code)) {
    db[user].splice(db[user].indexOf(code), 1);
    cdb[user] = pswd;

    commitChanges(
      "reset password",
      res,
      true,
      { db: "cred", data: cdb },
      { db: "pswdreset", data: db }
    );

    return;
  }

  res.statusCode = 401;

  writeToRes(
    res,
    createErrorRes(
      "Can't reset password",
      "The reset code you entered is incorrect."
    )
  );
}
