import crypto from "crypto";

export class Utils {
  /**
   * Verify an incoming Relae webhook payload.
   *
   * @param body - Raw request body as string
   * @param signature - Value of the X-Relae-Signature header
   * @param secret - Your account's Relae webhook secret
   * @returns boolean - true if the signature is valid, false otherwise
   */
  static verifyRelaeSignature(
    body: string,
    signature: string,
    secret: string,
  ): boolean {
    if (!signature || !secret) return false;
    const [t, v1] = signature.split(",").map((s) => s.split("=")[1]);

    const signedPayload = `${t}.${body}`;

    const hmac = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest("hex");

    return crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(hmac));
  }
}
