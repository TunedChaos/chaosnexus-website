// chaosnexus-website/functions/oauth/register.ts
/**
 * OAuth 2.0 dynamic client registration stub (RFC 7591 shape).
 *
 * Public docs need no client registration. Returns a clear error and points
 * at auth.md / commercial licensing for non-AGPL embedding.
 */

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

  return Response.json(
  {
  error: "invalid_client_metadata",
  error_description:
  "No OAuth client registration is required for public ChaosNexus docs or AI Search MCP. Use anonymous access. For commercial licensing see https://chaosnexus.ai/guide/support - details: https://chaosnexus.ai/auth.md",
  auth_documentation: "https://chaosnexus.ai/auth.md",
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
