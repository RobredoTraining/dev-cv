import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// 3 intentos cada 10 minutos (como tu versión original)
export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "10 m"),
});

export function getIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

