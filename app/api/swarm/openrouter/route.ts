export const runtime = "nodejs";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_REQUEST_BYTES = 1_000_000;

const secretNames = [
  "OPENROUTER_API_KEY",
  "OPENROUTER_SITE_URL",
  "OPENROUTER_APP_TITLE",
  "OPENROUTER_DEFAULT_MODEL",
  "OPENROUTER_ALLOWED_MODELS",
  "OPENROUTER_PRODUCTION_ENABLED"
];

type ProviderPolicyName =
  | "balanced"
  | "fast"
  | "economy"
  | "private"
  | "reasoning"
  | "vision"
  | "fallback";

type JsonSchema = {
  name: string;
  strict?: boolean;
  schema: Record<string, unknown>;
};

type OpenRouterRequest = {
  model?: string;
  messages: Array<Record<string, unknown>>;
  stream?: boolean;
  response_schema?: JsonSchema;
  response_format?: Record<string, unknown>;
  provider_policy?: ProviderPolicyName;
  provider?: Record<string, unknown>;
  fallback_enabled?: boolean;
  temperature?: number;
  max_tokens?: number;
  tools?: Array<Record<string, unknown>>;
  tool_choice?: unknown;
  metadata?: Record<string, unknown>;
  seal_approved?: boolean;
  data_class?: "public" | "masked" | "sandbox" | "sensitive";
};

const providerPolicies: Record<ProviderPolicyName, Record<string, unknown>> = {
  balanced: {
    allow_fallbacks: true
  },
  fast: {
    sort: "latency",
    allow_fallbacks: true
  },
  economy: {
    sort: "price",
    allow_fallbacks: true
  },
  private: {
    data_collection: "deny",
    require_parameters: true,
    allow_fallbacks: true
  },
  reasoning: {
    require_parameters: true,
    allow_fallbacks: true
  },
  vision: {
    require_parameters: true,
    allow_fallbacks: true
  },
  fallback: {
    allow_fallbacks: true
  }
};

function credentialPresence() {
  return secretNames.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});
}

function allowedModels(): string[] {
  return (process.env.OPENROUTER_ALLOWED_MODELS ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);
}

function isModelAllowed(model: string): boolean {
  const allowed = allowedModels();
  if (allowed.length === 0) return true;

  return allowed.some((pattern) => {
    if (pattern.endsWith("/*")) return model.startsWith(pattern.slice(0, -1));
    return model === pattern;
  });
}

function jsonError(message: string, status: number, details?: unknown) {
  return Response.json(
    {
      ok: false,
      error: message,
      details,
      timestamp: new Date().toISOString()
    },
    { status }
  );
}

export async function GET() {
  return Response.json({
    status: "OpenRouter swarm route active",
    role: "ABBA MAS model router and multi-model gateway",
    default_model: process.env.OPENROUTER_DEFAULT_MODEL ?? "openrouter/auto",
    capabilities: {
      streaming: true,
      structured_outputs: true,
      provider_preferences: true,
      model_fallbacks: true
    },
    provider_policies: Object.keys(providerPolicies),
    secret_names: secretNames,
    credential_presence: credentialPresence(),
    credential_values_hidden: true,
    production_enabled: process.env.OPENROUTER_PRODUCTION_ENABLED === "true",
    allowed_models: allowedModels(),
    seal_level_default: "SEAL-4",
    allowed_data: [
      "public prompts",
      "masked task context",
      "sandbox test prompts",
      "non-sensitive summaries",
      "model routing metadata"
    ],
    forbidden_data: [
      "raw secrets",
      "private keys",
      "banking credentials",
      "unredacted identity files",
      "vault documents",
      "Actual value",
      "irreversible execution instructions without SEAL"
    ],
    doctrine:
      "OpenRouter routes model calls. ABBA resolves. SEAL approves. Actual reveals value only after permission.",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return jsonError("OPENROUTER_API_KEY is not configured", 503);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonError("Request body exceeds the 1 MB route limit", 413);
  }

  let body: OpenRouterRequest;
  try {
    body = (await request.json()) as OpenRouterRequest;
  } catch {
    return jsonError("Invalid JSON request body", 400);
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return jsonError("messages must be a non-empty array", 400);
  }

  if (body.data_class === "sensitive" && !body.seal_approved) {
    return jsonError("SEAL approval is required for sensitive model calls", 403);
  }

  if (
    process.env.NODE_ENV === "production" &&
    process.env.OPENROUTER_PRODUCTION_ENABLED !== "true"
  ) {
    return jsonError(
      "OpenRouter production calls are disabled. Set OPENROUTER_PRODUCTION_ENABLED=true after SEAL review.",
      503
    );
  }

  const model = body.model ?? process.env.OPENROUTER_DEFAULT_MODEL ?? "openrouter/auto";
  if (!isModelAllowed(model)) {
    return jsonError("Requested model is not in OPENROUTER_ALLOWED_MODELS", 403, { model });
  }

  const policyName = body.provider_policy ?? "balanced";
  if (!(policyName in providerPolicies)) {
    return jsonError("Unknown provider_policy", 400, {
      received: policyName,
      allowed: Object.keys(providerPolicies)
    });
  }

  const provider = {
    ...providerPolicies[policyName],
    ...(body.provider ?? {}),
    allow_fallbacks:
      body.fallback_enabled ??
      (providerPolicies[policyName].allow_fallbacks as boolean | undefined) ??
      true
  };

  const responseFormat = body.response_schema
    ? {
        type: "json_schema",
        json_schema: {
          name: body.response_schema.name,
          strict: body.response_schema.strict ?? true,
          schema: body.response_schema.schema
        }
      }
    : body.response_format;

  const upstreamBody: Record<string, unknown> = {
    model,
    messages: body.messages,
    stream: body.stream ?? false,
    provider
  };

  if (responseFormat) upstreamBody.response_format = responseFormat;
  if (typeof body.temperature === "number") upstreamBody.temperature = body.temperature;
  if (typeof body.max_tokens === "number") upstreamBody.max_tokens = body.max_tokens;
  if (body.tools) upstreamBody.tools = body.tools;
  if (body.tool_choice !== undefined) upstreamBody.tool_choice = body.tool_choice;

  const startedAt = Date.now();
  let upstream: Response;

  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "https://carbonactual.com",
        "X-Title": process.env.OPENROUTER_APP_TITLE ?? "ABBA MAS"
      },
      body: JSON.stringify(upstreamBody),
      signal: request.signal
    });
  } catch (error) {
    return jsonError("OpenRouter request failed before a response was received", 502, {
      message: error instanceof Error ? error.message : "Unknown upstream error"
    });
  }

  const commonHeaders = {
    "Cache-Control": "no-store",
    "X-ABBA-Model": model,
    "X-ABBA-Provider-Policy": policyName,
    "X-ABBA-Latency-Ms": String(Date.now() - startedAt)
  };

  if (body.stream) {
    if (!upstream.body) return jsonError("OpenRouter returned an empty stream", 502);

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...commonHeaders,
        "Content-Type": upstream.headers.get("content-type") ?? "text/event-stream",
        Connection: "keep-alive"
      }
    });
  }

  const responseText = await upstream.text();
  return new Response(responseText, {
    status: upstream.status,
    headers: {
      ...commonHeaders,
      "Content-Type": upstream.headers.get("content-type") ?? "application/json"
    }
  });
}
