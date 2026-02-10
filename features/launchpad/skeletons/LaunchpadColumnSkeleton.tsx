import { LaunchpadsToolbar } from "@/features/launchpad/components/LaunchpadsToolbar";

type LaunchpadColumnSkeletonProps = {
  isFirst?: boolean;
};

export function LaunchpadColumnSkeleton({ isFirst }: LaunchpadColumnSkeletonProps) {
  return (
    <div className={`flex h-full min-h-0 flex-col gap-3 ${isFirst ? "" : "xl:-ml-px"}`}>
      <LaunchpadsToolbar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-(--border) bg-(--surface-2)">
        <div className="flex items-center justify-between border-b border-(--border) bg-[#160b30] px-4 py-3">
          <div className="h-4 w-24 animate-pulse rounded bg-(--surface)" />
          <div className="flex items-center gap-2">
            <div className="h-7 w-20 animate-pulse rounded-sm bg-(--surface)" />
            <div className="h-7 w-16 animate-pulse rounded-sm bg-(--surface)" />
          </div>
        </div>
        <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto divide-y divide-(--border) bg-background">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="h-32.5 px-4 py-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 animate-pulse rounded-sm bg-(--surface)" />
                    <div className="h-4 w-32 animate-pulse rounded bg-(--surface)" />
                  </div>
                  <div className="h-3 w-24 animate-pulse rounded bg-(--surface)" />
                  <div className="h-2 w-14.5 animate-pulse rounded bg-(--surface)" />
                </div>
                <div className="grid min-w-35 gap-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-(--surface)" />
                  <div className="h-3 w-24 animate-pulse rounded bg-(--surface)" />
                  <div className="h-3 w-24 animate-pulse rounded bg-(--surface)" />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                {[0, 1, 2, 3, 4].map((chip) => (
                  <div
                    key={chip}
                    className="h-5.25 w-14 animate-pulse rounded-sm bg-(--surface)"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
