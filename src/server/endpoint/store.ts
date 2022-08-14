import { EggsDelete } from "../../api/eggs/delete";
import { EggsEdit } from "../../api/eggs/edit";
import { eggsGet } from "../../api/eggs/get";
import { EggsRegister } from "../../api/eggs/register";
import { adminChangePswd } from "../../api/userman/admin/changepswd";
import { adminDelUser } from "../../api/userman/admin/deluser";
import { adminGetList } from "../../api/userman/admin/getlist";
import { adminGrant } from "../../api/userman/admin/grant";
import { adminPrefDelete } from "../../api/userman/admin/pref/delete";
import { adminPrefGet } from "../../api/userman/admin/pref/get";
import { adminPrefSet } from "../../api/userman/admin/pref/set";
import { adminPasswordResetGetCodes } from "../../api/userman/admin/pswdreset/getcodes";
import { adminRevoke } from "../../api/userman/admin/revoke";
import { adminUserBan } from "../../api/userman/admin/user/ban";
import { adminUserDisable } from "../../api/userman/admin/user/disable";
import { adminUserEnable } from "../../api/userman/admin/user/enable";
import { adminUserUnban } from "../../api/userman/admin/user/unban";
import { Login } from "../../api/userman/login";
import { prefDelete } from "../../api/userman/pref/delete";
import { prefGet } from "../../api/userman/pref/get";
import { prefSet } from "../../api/userman/pref/set";
import { userCreate } from "../../api/userman/user/create";
import { userDelete } from "../../api/userman/user/delete";
import { userExists } from "../../api/userman/user/exists";
import { UserGetList } from "../../api/userman/user/getlist";
import { userIsAdmin } from "../../api/userman/user/isadmin";
import { userIsDisabled } from "../../api/userman/user/isdisabled";
import { UserPswdResetCodeGen } from "../../api/userman/user/pswdreset/codegen";
import { passwordResetReset } from "../../api/userman/user/pswdreset/reset";
import { Endpoint } from "./main";

export const SchoolSystemAPIEval = new Map<string, Endpoint>([
  [
    "/api/auth/check",
    {
      auth: true,
      admin: false,
      checkAuth: true,

      requiredParams: [],
      optionalParams: [],
      description: "Used for verifying credentials",
      func: Login,
    },
  ],
  [
    "/pref/get",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [{ key: "item", format: "base64" }],
      description: "Used for getting user preferences",
      func: prefGet,
    },
  ],
  [
    "/pref/delete",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [{ key: "item", format: "base64" }],
      optionalParams: [],
      description: "Used for deleting user preferences",
      func: prefDelete,
    },
  ],
  [
    "/pref/set",
    {
      auth: true,
      admin: false,
      checkAuth: true,

      requiredParams: [
        { key: "item", format: "base64" },
        { key: "value", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for setting user preferences",
      func: prefSet,
    },
  ],
  [
    "/api/user/create",
    {
      auth: true,
      admin: false,
      checkAuth: false,

      requiredParams: [],
      optionalParams: [],
      description: "Used for creating users",
      func: userCreate,
    },
  ],
  [
    "/api/user/exists",
    {
      auth: false,
      admin: false,
      checkAuth: false,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for checking if a user exists",
      func: userExists,
    },
  ],
  [
    "/api/user/delete",
    {
      auth: true,
      admin: false,
      checkAuth: true,

      requiredParams: [],
      optionalParams: [],
      description: "Used for deleting a user",
      func: userDelete,
    },
  ],
  [
    "/user/getlist",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [],
      optionalParams: [],
      description: "Used for getting a list of users",
      func: UserGetList,
    },
  ],
  [
    "/user/isdisabled",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [],
      optionalParams: [],
      description: "Used for checking if a user is disabled",
      func: userIsDisabled,
    },
  ],
  [
    "/user/isadmin",
    {
      auth: true,
      admin: false,
      checkAuth: true,

      requiredParams: [],
      optionalParams: [],
      description: "Used for checking if the authenticated user is an admin",
      func: userIsAdmin,
    },
  ],
  [
    "/admin/changepswd",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [
        { key: "user", format: "base64" },
        { key: "new", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for changing the password for another user",
      func: adminChangePswd,
    },
  ],
  [
    "/admin/grant",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for granting administrative privileges",
      func: adminGrant,
    },
  ],
  [
    "/admin/revoke",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for revoking administrative privileges",
      func: adminRevoke,
    },
  ],
  [
    "/admin/getlist",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [],
      optionalParams: [],
      description: "Used for getting a list of admins",
      func: adminGetList,
    },
  ],
  [
    "/admin/deluser",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for forcefully deleting a user",
      func: adminDelUser,
    },
  ],
  [
    "/admin/pref/set",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [
        { key: "user", format: "base64" },
        { key: "item", format: "base64" },
        { key: "value", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for setting user preferences",
      func: adminPrefSet,
    },
  ],
  [
    "/admin/pref/get",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [{ key: "item", format: "base64" }],
      description: "Used for getting user preferences",
      func: adminPrefGet,
    },
  ],
  [
    "/admin/pref/delete",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [
        { key: "user", format: "base64" },
        { key: "item", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for deleting user preferences",
      func: adminPrefDelete,
    },
  ],
  [
    "/admin/user/enable",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for re-enabling users",
      func: adminUserEnable,
    },
  ],
  [
    "/admin/user/disable",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for disabling users",
      func: adminUserDisable,
    },
  ],
  [
    "/admin/user/ban",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for banning users from API access.",
      func: adminUserBan,
    },
  ],
  [
    "/admin/user/unban",
    {
      auth: true,
      admin: true,
      checkAuth: true,

      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for unbanning users",
      func: adminUserUnban,
    },
  ],
  [
    "/user/pswdreset/codegen",
    {
      auth: false,
      admin: false,
      checkAuth: false,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for creating password reset codes",
      func: UserPswdResetCodeGen,
    },
  ],
  [
    "/user/pswdreset/reset",
    {
      auth: false,
      admin: false,
      checkAuth: false,
      requiredParams: [{ key: "user", format: "base64" },{ key: "code", format: "base64" },{ key: "new", format: "base64" }],
      optionalParams: [],
      description: "Used for resetting password",
      func: passwordResetReset,
    },
  ],
  [
    "/admin/pswdreset/getcodes",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for getting password reset codes",
      func: adminPasswordResetGetCodes,
    },
  ],
  [
    "/eggs/get",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for getting eggs",
      func: eggsGet,
    },
  ],
  [
    "/eggs/register",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [{key:"data",format:"base64"}],
      optionalParams: [],
      description: "Used for registering eggs",
      func: EggsRegister,
    },
  ],
  [
    "/eggs/delete",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [{key:"id",format:"number"}],
      optionalParams: [],
      description: "Used for deleting eggs",
      func: EggsDelete,
    },
  ],
  [
    "/eggs/edit",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [{key:"id",format:"number"},{key:"data",format:"number"}],
      optionalParams: [],
      description: "Used for editing eggs",
      func: EggsEdit,
    },
  ],
]);
