import { LaunchpadColumn } from "@/features/launchpad/types";

export const mockLaunchpadColumns: LaunchpadColumn[] = [
  {
    id: "new-pairs",
    title: "New Pairs",
    fee: "0.025",
    filterLabel: "Filter",
    count: 0,
    items: [
      {
        id: "new-1",
        name: "Ronaldo BINA...",
        symbol: "RNDBSC",
        age: "35m 2s",
        metrics: [
          { label: "M.Cap", value: "$0" },
          { label: "Vol", value: "$0" },
          { label: "Liq", value: "$0" },
          { label: "TX", value: "0" }
        ],
        progress: { percent: 0, label: "0%" },
        chips: [
          { label: "Holders", value: "0", tone: "muted" },
          { label: "Dev", value: "0%", tone: "red" },
          { label: "Insiders", value: "0%", tone: "green" }
        ]
      },
      {
        id: "new-2",
        name: "PotCoin",
        symbol: "POT",
        age: "38m 12s",
        metrics: [
          { label: "M.Cap", value: "$0" },
          { label: "Vol", value: "$0" },
          { label: "Liq", value: "$0" },
          { label: "TX", value: "0" }
        ],
        progress: { percent: 0, label: "0%" },
        chips: [
          { label: "Holders", value: "0", tone: "muted" },
          { label: "Dev", value: "0%", tone: "red" },
          { label: "Insiders", value: "0%", tone: "green" }
        ]
      },
      {
        id: "new-3",
        name: "阿诗丹顿的点点滴是是滴...",
        symbol: "AA",
        age: "38m 27s",
        metrics: [
          { label: "M.Cap", value: "$0" },
          { label: "Vol", value: "$0" },
          { label: "Liq", value: "$0" },
          { label: "TX", value: "0" }
        ],
        progress: { percent: 0, label: "0%" },
        chips: [
          { label: "Holders", value: "0", tone: "muted" },
          { label: "Dev", value: "0%", tone: "red" },
          { label: "Insiders", value: "0%", tone: "green" }
        ]
      }
    ]
  },
  {
    id: "almost-there",
    title: "Almost There",
    fee: "0.025",
    filterLabel: "Filter",
    count: 0,
    items: [
      {
        id: "almost-1",
        name: "YFIC",
        symbol: "YFIC",
        age: "8H 20m",
        metrics: [
          { label: "M.Cap", value: "$40.61K" },
          { label: "Vol", value: "$141" },
          { label: "Liq", value: "$9.17K" },
          { label: "TX", value: "18" }
        ],
        progress: { percent: 94, label: "94%" },
        chips: [
          { label: "Buy", value: "99.09%", tone: "green" },
          { label: "Sell", value: "72.50%", tone: "red" },
          { label: "Holders", value: "39", tone: "muted" },
          { label: "Unpaid", value: "0%", tone: "orange" }
        ]
      },
      {
        id: "almost-2",
        name: "Ensoul",
        symbol: "Ensoul",
        age: "1D 5h",
        metrics: [
          { label: "M.Cap", value: "$27.31K" },
          { label: "Vol", value: "$803" },
          { label: "Liq", value: "$6.68K" },
          { label: "TX", value: "13" }
        ],
        progress: { percent: 84, label: "84%" },
        chips: [
          { label: "Buy", value: "47.17%", tone: "green" },
          { label: "Sell", value: "3.72%", tone: "red" },
          { label: "Holders", value: "273", tone: "muted" },
          { label: "Paid", value: "3.72%", tone: "green" }
        ]
      },
      {
        id: "almost-3",
        name: "pyro",
        symbol: "pyro",
        age: "6D 7h",
        metrics: [
          { label: "M.Cap", value: "$25.04K" },
          { label: "Vol", value: "$1" },
          { label: "Liq", value: "$6.35K" },
          { label: "TX", value: "1" }
        ],
        progress: { percent: 83, label: "83%" },
        chips: [
          { label: "Buy", value: "33.81%", tone: "green" },
          { label: "Sell", value: "0.00%", tone: "red" },
          { label: "Holders", value: "2", tone: "muted" },
          { label: "Unpaid", value: "0%", tone: "orange" }
        ]
      }
    ]
  },
  {
    id: "graduated",
    title: "Graduated",
    fee: "0.025",
    filterLabel: "Filter",
    count: 0,
    items: [
      {
        id: "grad-1",
        name: "龙王回归",
        symbol: "龙王回归",
        age: "1H 12m",
        metrics: [
          { label: "M.Cap", value: "$45.3K" },
          { label: "Vol", value: "$16.38K" },
          { label: "Liq", value: "$10.14K" },
          { label: "TX", value: "443" }
        ],
        progress: { percent: 100, label: "100%" },
        chips: [
          { label: "Buy", value: "18.74%", tone: "green" },
          { label: "Paid", value: "0.04%", tone: "green" },
          { label: "Holders", value: "299", tone: "muted" },
          { label: "Sell", value: "10.95%", tone: "red" }
        ]
      },
      {
        id: "grad-2",
        name: "马仆人翻",
        symbol: "马仆人翻",
        age: "5H 30m",
        metrics: [
          { label: "M.Cap", value: "$2.66K" },
          { label: "Vol", value: "$25" },
          { label: "Liq", value: "$2.46K" },
          { label: "TX", value: "2" }
        ],
        progress: { percent: 100, label: "100%" },
        chips: [
          { label: "Buy", value: "6.25%", tone: "green" },
          { label: "Paid", value: "0.00%", tone: "green" },
          { label: "Holders", value: "32", tone: "muted" },
          { label: "Sell", value: "0%", tone: "red" }
        ]
      },
      {
        id: "grad-3",
        name: "BIKBOK",
        symbol: "BIKBOK",
        age: "6H 45m",
        metrics: [
          { label: "M.Cap", value: "$3.16K" },
          { label: "Vol", value: "$92.69K" },
          { label: "Liq", value: "$2.71K" },
          { label: "TX", value: "2.12K" }
        ],
        progress: { percent: 100, label: "100%" },
        chips: [
          { label: "Buy", value: "6.49%", tone: "green" },
          { label: "Unpaid", value: "0.00%", tone: "orange" },
          { label: "Holders", value: "165", tone: "muted" },
          { label: "Sell", value: "0%", tone: "red" }
        ]
      }
    ]
  }
];
