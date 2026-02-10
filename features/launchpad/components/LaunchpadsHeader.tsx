"use client";

import { useState } from "react";
import { ChainIcon } from "@/components/common/ChainIcon";
import { Popup } from "@/components/common/Popup";
import { DisplayPopup } from "@/features/launchpad/components/displaypopup/DisplayPopup";

type LaunchpadsHeaderProps = {
  networkId: number;
  onNetworkChange: (networkId: number) => void;
};

const NETWORKS = [
  { id: 56, label: "BSC" },
  { id: 1399811149, label: "SOL" }
];

export function LaunchpadsHeader({ networkId, onNetworkChange }: LaunchpadsHeaderProps) {
  const [displayOpen, setDisplayOpen] = useState(false);

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
      <Popup
        open={displayOpen}
        onClose={() => setDisplayOpen(false)}
        trigger={
          <button
            type="button"
            onClick={() => setDisplayOpen((prev) => !prev)}
            className="rounded-md cursor-pointer border border-(--border) px-4 py-1.5 text-sm font-medium text-foreground shadow-sm"
          >
            Display
          </button>
        }
        blurBackground
        center
        panelClassName="w-[400px] bg-background p-4 border border-transparent rounded-sm shadow-lg rounded-[5px]"
      >
        <DisplayPopup onClose={() => setDisplayOpen(false)} />
      </Popup>
    </div>
  );
}
