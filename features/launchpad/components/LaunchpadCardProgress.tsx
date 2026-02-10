export function LaunchpadCardProgress({
  progress
}: {
  progress: { percent: number; label?: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-14.5 overflow-hidden bg-[hsl(256_52%_18%)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,hsla(336,100%,82%,0.3)_0,hsla(336,100%,82%,0.3)_0.5px,transparent_0.5px,transparent_3px)]" />
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${progress.percent}%` }}
        >
          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,hsl(336_100%_82%)_0,hsl(336_100%_82%)_0.5px,transparent_0.5px,transparent_3px)]" />
        </div>
      </div>
      <span className="text-xs text-(--muted)">{progress.label}</span>
    </div>
  );
}
