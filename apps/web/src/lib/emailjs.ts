/**
 * Legacy EmailJS helper — deprecated. Prefer `apiFetch('/enquiries')`.
 * Kept as a no-op stub so old imports do not break during migrate.
 */
export async function sendEmail(_params: Record<string, string>): Promise<void> {
  throw new Error(
    'EmailJS is disabled. Submit enquiries via POST /api/v1/enquiries.',
  );
}
