// chaosnexus-website/functions/oauth/authorize.ts
/**
 * OAuth 2.0 authorization endpoint stub.
 *
 * Public ChaosNexus docs/MCP do not require interactive login. Redirect agents
 * and browsers to auth.md, which documents anonymous access.
 */

const AUTH_DOC = "https://chaosnexus.ai/auth.md";

export async function onRequest(context: {
  request: Request;
}): Promise<Response> {
  const url = new URL(context.request.url);
  const redirectUri = url.searchParams.get("redirect_uri");
  const state = url.searchParams.get("state");
  const accept = context.request.headers.get("Accept") ?? "";

  // Machine clients preferring JSON get an explicit error instead of HTML.
  if (accept.includes("application/json") && !accept.includes("text/html")) {
    return Response.json(
      {
        error: "access_denied",
        error_description:
          "ChaosNexus public documentation and AI Search MCP do not require OAuth. Omit Authorization and call resources directly. See https://chaosnexus.ai/auth.md",
        auth_documentation: AUTH_DOC,
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  // If a redirect_uri was supplied, bounce back with an OAuth error so clients
  // do not hang waiting for a code (public resources need no code).
  if (redirectUri) {
    try {
      const target = new URL(redirectUri);
      target.searchParams.set("error", "access_denied");
      target.searchParams.set(
        "error_description",
        "Public ChaosNexus resources do not require OAuth; see https://chaosnexus.ai/auth.md",
      );
      if (state) target.searchParams.set("state", state);
      return Response.redirect(target.toString(), 302);
    } catch {
      // fall through to docs
    }
  }

  return Response.redirect(AUTH_DOC, 302);
}
