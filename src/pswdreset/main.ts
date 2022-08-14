import { commitInternalChanges, getDB } from "../db/main";

export type PasswordResetDB = { [key: string]: string[] };

export async function checkPswdResetDB() {
  const pdb = (await getDB("pref")) as PasswordResetDB;
  const rdb = await getDB("pswdreset");

  if (!pdb || !rdb) throw new Error("Missing databases pref and/or pswdreset");

  for (const user in pdb) {
    if (!rdb[user]) {
      rdb[user] = [];
    }
  }

  commitInternalChanges({ db: "pswdreset", data: rdb });
}
