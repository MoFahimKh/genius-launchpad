export function LaunchpadRowProgress({
  progress
}: {
  progress: { percent: number; label?: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-full rounded-[1px] bg-[var(--border)]">
        <div
          className="h-1 rounded-[1px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
      <span className="text-xs text-[var(--muted)]">{progress.label}</span>
    </div>
  );
}
