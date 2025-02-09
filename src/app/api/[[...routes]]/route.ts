import { Hono } from "hono";
import { handle } from "hono/vercel";

/**@routes */
import auth from "@/features/auth/server";
import workspaces from "@/features/workspaces/route";



const app = new Hono().basePath("/api");


const routes = app
    .route("/auth", auth)
    .route("/workspaces", workspaces)
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export type AppType = typeof routes;