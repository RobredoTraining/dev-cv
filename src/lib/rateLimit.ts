type Entry = { count: number; resetAt: number };
const hits = new Map<string, Entry>();

export function rateLimit(ip: string, limit = 3, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  hits.set(ip, entry);
  return { ok: true, remaining: limit - entry.count };
}

export function getIp(req: Request) {
  // Vercel / proxies suelen mandar x-forwarded-for.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}
