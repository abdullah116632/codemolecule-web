export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const primary = searchParams.get("primary");
  const backup = searchParams.get("backup");

  if (!primary) {
    return new Response("Missing primary URL", { status: 400 });
  }
  if (!backup) {
    return Response.redirect(primary, 302);
  }

  try {
    // Perform a quick health check on the primary URL
    // We use a short timeout so the user isn't kept waiting too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(primary, {
      method: "HEAD", // Just fetch headers to be fast
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (res.ok) {
      // Primary URL is up and returned a 2xx status
      return Response.redirect(primary, 302);
    } else {
      // Primary URL returned an error status (e.g. 500, 404), redirect to backup
      return Response.redirect(backup, 302);
    }
  } catch (error) {
    // Fetch failed due to network error, DNS resolution failure, or timeout
    console.error("Health check failed for", primary, error.message);
    return Response.redirect(backup, 302);
  }
}

