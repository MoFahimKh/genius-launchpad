export function LaunchpadRowProgress({
  progress
}: {
  progress: { percent: number; label?: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-14.5 overflow-hidden bg-(--border)">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(183,166,214,0.35)_0,rgba(183,166,214,0.35)_2px,transparent_2px,transparent_6px)]" />
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${progress.percent}%` }}
        >
          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#d77bff_0,#d77bff_2px,transparent_2px,transparent_6px)]" />
        </div>
      </div>
      <span className="text-xs text-(--muted)">{progress.label}</span>
    </div>
  );
}
