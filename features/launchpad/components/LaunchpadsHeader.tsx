import { Flame, Star, Clock } from "lucide-react";
import { ChainIcon } from "@/components/common/ChainIcon";

type LaunchpadsHeaderProps = {
  networkId: number;
  onNetworkChange: (networkId: number) => void;
};

const NETWORKS = [
  { id: 56, label: "BSC" },
  { id: 1399811149, label: "SOL" }
];

export function LaunchpadsHeader({ networkId, onNetworkChange }: LaunchpadsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-md font-medium text-foreground">Launchpads</h1>
          <div className="flex items-center gap-1">
            {NETWORKS.map((network) => {
              const isActive = networkId === network.id;
              return (
                <button
                  key={network.id}
                  type="button"
                  onClick={() => onNetworkChange(network.id)}
                  className={`rounded-sm p-1 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-60"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`${network.label} network`}
                >
                  <ChainIcon size={16} networkId={network.id} showFrame={false} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-md border border-(--border) px-4 py-1.5 text-sm font-medium text-foreground shadow-sm"
      >
        Display
      </button>
    </div>
  );
}
