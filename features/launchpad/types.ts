import { LucideIcon } from "lucide-react";

export type Metric = {
  label: string;
  value: string;
};

export type ChipTone = "green" | "red" | "orange" | "blue" | "muted";

export type Chip = {
  label: string;
  value: string;
  tone: ChipTone;
  icon: any;
};

export type LaunchpadItem = {
  id: string;
  name: string;
  symbol: string;
  age: string;
  metrics: Metric[];
  progress: {
    percent: number;
    label?: string;
  };
  chips: Chip[];
  avatarUrl?: string;
  statusIcons?: string[];
  networkId?: number;
  liquidityValue?: number;
  volumeValue?: number;
  marketCapValue?: number;
};

export type LaunchpadColumn = {
  id: string;
  title: string;
  fee: string;
  filterLabel: string;
  count: number;
  items: LaunchpadItem[];
};
