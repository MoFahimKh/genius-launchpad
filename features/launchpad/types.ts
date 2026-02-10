export type Metric = {
  label: string;
  value: string;
};

export type Chip = {
  label: string;
  value: string;
  icon: any;
  val?: number
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
  socialLinks?: {
    twitter?: string;
    telegram?: string;
    website?: string;
  };
};

export type LaunchpadColumn = {
  id: string;
  title: string;
  fee: string;
  filterLabel: string;
  count: number;
  items: LaunchpadItem[];
};
