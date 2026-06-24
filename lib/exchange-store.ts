type StoreResult = {
  persisted: boolean;
  status?: number;
  error?: string;
};

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, key };
}

export async function insertExchangeRecord(
  table: string,
  record: Record<string, unknown>
): Promise<StoreResult> {
  const { url, key } = config();
  if (!url || !key) return { persisted: false, error: "supabase_admin_not_configured" };

  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(record),
    cache: "no-store"
  });

  return {
    persisted: response.ok,
    status: response.status,
    error: response.ok ? undefined : await response.text()
  };
}

export async function upsertExchangeRecord(
  table: string,
  record: Record<string, unknown>,
  conflictColumn: string
): Promise<StoreResult> {
  const { url, key } = config();
  if (!url || !key) return { persisted: false, error: "supabase_admin_not_configured" };

  const response = await fetch(
    `${url}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflictColumn)}`,
    {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(record),
      cache: "no-store"
    }
  );

  return {
    persisted: response.ok,
    status: response.status,
    error: response.ok ? undefined : await response.text()
  };
}
