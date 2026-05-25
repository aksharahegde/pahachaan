import { createError, getQuery, setResponseHeader } from "h3";
import { SignJWT } from "jose";

import { VISITORS_CHANNEL_NAME } from "~~/app/utils/ablyVisitors";

function readClientId(value: unknown): string {
  if (typeof value !== "string") {
    return `visitor-${crypto.randomUUID()}`;
  }

  const clientId = value.trim();
  return clientId || `visitor-${crypto.randomUUID()}`;
}

export default defineEventHandler(async (event) => {
  const apiKey = process.env.ABLY_API_KEY;
  const [keyName, keySecret] = apiKey?.split(":") ?? [];

  if (!keyName || !keySecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ably API key is not configured",
    });
  }

  const clientId = readClientId(getQuery(event).clientId);
  const capability = {
    [VISITORS_CHANNEL_NAME]: ["presence", "subscribe"],
  };
  const token = await new SignJWT({
    "x-ably-clientId": clientId,
    "x-ably-capability": JSON.stringify(capability),
  })
    .setProtectedHeader({ alg: "HS256", kid: keyName })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(keySecret));

  setResponseHeader(event, "content-type", "application/jwt");
  return token;
});
