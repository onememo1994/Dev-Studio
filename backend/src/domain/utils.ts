/**
 * Domain utility functions.
 * Pure helpers with zero external dependencies — safe to import from any layer.
 */

export function stripDates(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const { createdAt, updatedAt, created_at, updated_at, ...rest } = data;
  void createdAt;
  void updatedAt;
  void created_at;
  void updated_at;
  return rest;
}

export function isUUID(id: unknown): id is string {
  return (
    typeof id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  );
}
