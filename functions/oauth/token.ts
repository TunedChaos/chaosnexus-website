// chaosnexus-website/functions/oauth/token.ts
/**
 * OAuth 2.0 token endpoint stub.
 *
 * Does not issue access tokens for public docs/MCP. Returns a clear OAuth
 * error so agents fall back to anonymous access documented in auth.md.
 */

const BODY = {
  error: "invalid_grant",
  error_description:
    "ChaosNexus public documentation and AI Search MCP do not require OAuth tokens. Call endpoints without a Bearer token. See https://chaosnexus.ai/auth.md",
  auth_documentation: "https://chaosnexus.ai/auth.md",
};

export async function onRequest(context: {
  request: Request;
}): Promise<Response> {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST, OPTIONS" },
    });
  }

  return Response.json(BODY, {
    status: 400,
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
