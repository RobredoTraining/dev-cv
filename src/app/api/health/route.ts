export const runtime = "nodejs";

export async function GET() {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    "local";

  return Response.json(
    {
      status: "ok",
      service: "portfolio",
      version: sha,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
