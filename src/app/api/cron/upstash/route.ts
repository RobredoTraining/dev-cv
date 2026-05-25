import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

const redis = Redis.fromEnv();

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const now = new Date().toISOString();
  const key = `keepalive:${now.slice(0, 10)}`;

  await redis.incr(key);
  await redis.expire(key, 60 * 60 * 24 * 8);
  await redis.set("keepalive:lastRun", now);

  return Response.json({ ok: true, key, ranAt: now });
}