import crypto from "crypto";

export function sign(payload: string, secret: string) {
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return {
    timestamp,
    signature,
    header: `t=${timestamp},v1=${signature}`,
  };
}

export function verifySignature({
  rawBody,
  header,
  secret,
  tolerance = 300,
}: {
  rawBody: string;
  header: string;
  secret: string;
  tolerance?: number;
}): boolean {
  const parsed = Object.fromEntries(header.split(",").map((x) => x.split("=")));

  const timestamp = parseInt(parsed["t"], 10);
  const expected = parsed["v1"];

  const computed = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const valid = crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(computed),
  );

  const age = Math.abs(Date.now() / 1000 - timestamp);
  if (age > tolerance) return false;

  return valid;
}
