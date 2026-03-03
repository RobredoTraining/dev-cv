import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
const redis = Redis.fromEnv();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  
  // INCR con key temporal
  const key = `keepalive:${new Date().toISOString().slice(0, 10)}`; // keepalive:YYYY-MM-DD
  await redis.incr(key);
  await redis.expire(key, 60 * 60 * 24 * 8); // 8 días

  return Response.json({ ok: true });
}