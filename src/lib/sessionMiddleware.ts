import "server-only";

import {
  Account, Client, Storage, Databases, Models,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
 } from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { COOKIE } from "@/features/auth/constants";


type SessionMiddlwareType  = {
  Variables: { 
    account: AccountType,
    storage: StorageType,
    databases: DatabasesType,
    user: Models.User<Models.Preferences>
  }
}
export const sessionMiddlware = createMiddleware<SessionMiddlwareType>(async( c, next ) => {
  const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  
  const session = getCookie(c, COOKIE);

  if(!session)
  {
    return c.json({ error: "Un authorized" });
  }

  client.setSession(session);

  const account = new Account(client);
  const storage = new Storage(client);
  const databases = new Databases(client);
  const user = await account.get();

  c.set("account", account);
  c.set("storage", storage);
  c.set("databases", databases);
  c.set("user", user);
  await next();
});

