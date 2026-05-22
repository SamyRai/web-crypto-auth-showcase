import { z } from 'zod';

/**
 * Schema for successful passkey assertion payload (e.g. for sending to server).
 * Zod v4 used for runtime validation at boundaries.
 */
export const passkeyAssertionPayloadSchema = z.object({
  credentialId: z.string().min(1),
  clientDataJSON: z.string().min(1),
  authenticatorData: z.string().min(1),
  signature: z.string().min(1),
  userHandle: z.string().nullable(),
});

export type PasskeyAssertionPayload = z.infer<typeof passkeyAssertionPayloadSchema>;

export function parseAssertionPayload(
  raw: unknown
): { success: true; data: PasskeyAssertionPayload } | { success: false; error: z.ZodError } {
  const result = passkeyAssertionPayloadSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
