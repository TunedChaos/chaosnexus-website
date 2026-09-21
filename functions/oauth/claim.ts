// chaosnexus-website/functions/oauth/claim.ts
/**
 * Anonymous claim endpoint for auth.md agent_auth.anonymous.claim_uri.
 *
 * Public docs/MCP do not mint claim tokens. Return 200 JSON documenting that
 * anonymous (no-credential) access is the supported path.
 */

const BODY = {
  status: "anonymous_ok",
  message:
    "No claim token is required for ChaosNexus public documentation or AI Search MCP. Call resources without Authorization. See https://chaosnexus.ai/auth.md",
  auth_documentation: "https://chaosnexus.ai/auth.md",
  credential_types_supported: ["claim_token"],
  anonymous_access: true,
};

export async function onRequest(context: {
  request: Request;
}): Promise<Response> {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  return Response.json(BODY, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
