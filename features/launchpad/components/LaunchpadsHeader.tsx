import { Flame, Star, Clock, Hexagon, Sun } from "lucide-react";

type LaunchpadsHeaderProps = {
  networkId: number;
  onNetworkChange: (networkId: number) => void;
};

const NETWORKS = [
  { id: 56, label: "BSC", icon: Hexagon, color: "text-[#f3ba2f]" },
  { id: 1399811149, label: "SOL", icon: Sun, color: "text-[#8b7bff]" }
];

export function LaunchpadsHeader({ networkId, onNetworkChange }: LaunchpadsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-(--muted)">
          <Flame size={18} />
          <Star size={18} />
          <Clock size={18} />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground">Launchpads</h1>
          <div className="flex items-center gap-1">
            {NETWORKS.map((network) => {
              const Icon = network.icon;
              const isActive = networkId === network.id;
              return (
                <button
                  key={network.id}
                  type="button"
                  onClick={() => onNetworkChange(network.id)}
                  className={`rounded-sm border px-2 py-1 text-[10px] font-semibold transition ${
                    isActive
                      ? "border-(--border-strong) bg-(--surface-3)"
                      : "border-(--border) bg-(--surface-2)"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`${network.label} network`}
                >
                  <Icon size={12} className={network.color} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-lg border border-(--border) bg-(--surface-2) px-4 py-2 text-sm font-medium text-foreground shadow-sm"
      >
        Display
      </button>
    </div>
  );
}
