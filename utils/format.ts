export function formatCompactNumber(value?: number | string) {
  if (value === undefined || value === null) return "0";
  const num = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(num)) return String(value);
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
}

export function formatCurrency(value?: number | string) {
  if (value === undefined || value === null) return "$0";
  const num = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(num)) return `$${value}`;
  return `$${formatCompactNumber(num)}`;
}

export function formatPercent(value?: number | string) {
  if (value === undefined || value === null) return "0%";
  const num = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(num)) return `${value}%`;
  return `${num.toFixed(2)}%`;
}

export function formatOptionalPercent(value?: number | string, placeholder = "--") {
  if (value === undefined || value === null || value === "") return placeholder;
  return formatPercent(value);
}

export function formatOptionalNumber(value?: number | string, placeholder = "--") {
  if (value === undefined || value === null || value === "") return placeholder;
  return formatCompactNumber(value);
}

export function formatOptionalText(
  value?: string | number | boolean | null,
  placeholder = "--"
) {
  if (value === undefined || value === null || value === "") return placeholder;
  if (typeof value === "boolean") return value ? "Paid" : "Unpaid";
  return String(value);
}

export function parseNumber(value?: number | string) {
  if (value === undefined || value === null || value === "") return undefined;
  const num = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(num) ? num : undefined;
}

export function formatAge(createdAt?: number) {
  if (!createdAt) return "--";
  const ts = createdAt > 1e12 ? createdAt : createdAt * 1000;
  const diff = Math.max(0, Date.now() - ts);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}D ${hours % 24}h`;
  if (hours > 0) return `${hours}H ${minutes % 60}m`;
  return `${minutes}m ${Math.floor((diff % 60000) / 1000)}s`;
}
