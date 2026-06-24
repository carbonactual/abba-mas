export type ApiErrorCode = 'validation_error' | 'permission_denied' | 'not_found' | 'seal_required' | 'provider_error' | 'internal_error';

export type ApiResult<T> =
  | { ok: true; data: T; correlation_id: string }
  | { ok: false; error: { code: ApiErrorCode; message: string; correlation_id: string } };

export function ok<T>(data: T, correlationId: string): ApiResult<T> {
  return { ok: true, data, correlation_id: correlationId };
}

export function fail(code: ApiErrorCode, message: string, correlationId: string): ApiResult<never> {
  return { ok: false, error: { code, message, correlation_id: correlationId } };
}

export function correlationId(headers?: Headers): string {
  return headers?.get('x-correlation-id') || crypto.randomUUID();
}
