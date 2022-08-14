import argon2 from "argon2";
import { verify } from "argon2";
import { getDB, setDB } from "../db/main";
import { UserPreferences } from "./pref";

export async function createUser(
  username: string,
  password: string
): Promise<createUserReturn> {
  const cdb = await getDB("cred");
  const pdb = await getDB("pref");

  if (!cdb || !pdb) return "dbgeterror";
  if (cdb[username] || pdb[username]) return "userexists";

  const pswd = await argon2.hash(password, {
    type: argon2.argon2i,
    memoryCost: 2 ** 10,
    timeCost: 2,
    hashLength: 16,
  });

  const userdata: UserPreferences = {
    role: "regular",
    name: username,
    theme: "default",
  };

  pdb[username] = userdata;
  cdb[username] = pswd;

  const valid = (await setDB("cred", cdb)) && (await setDB("pref", pdb));

  return valid ? "created" : "dbseterror";
}

export async function userExists(username: string) {
  const pdb = (await getDB("pref")) as { [key: string]: any };
  const cdb = (await getDB("cred")) as { [key: string]: string };

  return !!(pdb[username] && cdb[username]);
}

export type createUserReturn =
  | "created"
  | "dbseterror"
  | "dbgeterror"
  | "userexists";

export async function getAllUsernames() {
  const cdb = (await getDB("cred")) as { [key: string]: string };

  let usernames: string[] = [];

  for (const username in cdb) {
    usernames.push(username);
  }

  return usernames;
}