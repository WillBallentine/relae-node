import crypto from "crypto";

export class Utils {
  /**
   * Verify an incoming Relae webhook payload.
   *
   * @param body - Raw request body as string
   * @param signature - Value of the X-Relae-Signature header
   * @param secret - Your account's Relae webhook secret
   * @param toleranceSec - Optional max age of the webhook in seconds (default: 300s / 5 minutes)
   * @returns boolean - true if the signature is valid, false otherwise
   */
  static verifyRelaeSignature(
    body: string,
    signature: string,
    secret: string,
    toleranceSec = 300,
  ): boolean {
    if (!signature || !secret) return false;

    const [t, v1] = signature.split(",").map((s) => s.split("=")[1]);
    if (!t || !v1) return false;

    const timestamp = Date.parse(t);
    if (isNaN(timestamp)) return false;

    const now = Date.now();
    if (Math.abs(now - timestamp) / 1000 > toleranceSec) {
      return false;
    }

    const signedPayload = `${t}.${body}`;

    const hmac = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest("hex");

    return crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(hmac));
  }
}
