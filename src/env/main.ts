export const dbRoot = "./db";
export const DBs = new Map<string, DB>([
  [
    "cred",
    {
      name: "Credentials",
      path: `${dbRoot}/cred.json`,
    },
  ],
  [
    "pref",
    {
      name: "Preferences",
      path: `${dbRoot}/pref.json`,
    },
  ],
  [
    "bans",
    {
      name: "Banned Users",
      path: `${dbRoot}/bans.json`,
    },
  ],
  [
    "pswdreset",
    {
      name: "Password Reset",
      path: `${dbRoot}/pswdreset.json`,
    },
  ],
  [
    "eggs",
    {
      name: "Reggistry Database",
      path: `${dbRoot}/eggs.json`,
    },
  ],
]);

export interface DB {
  name: string;
  path: string;
}
