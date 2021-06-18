export const nodes = [
  {
    name: "Polkadot",
    icon: "/imgs/icons/polkadot.svg",
    value: "polkadot",
    symbol: "DOT",
  },
  {
    name: "Kusama",
    icon: "/imgs/icons/kusama.svg",
    value: "kusama",
    symbol: "KSM",
  },
  {
    name: "Rococo",
    icon: "/imgs/icons/rococo.png",
    value: "rococo",
    symbol: "ROC",
  },
];

export const blocksLatestHead = [
  { name: "Height" },
  { name: "Time" },
  { name: "Extrinsics", align: "right" },
  { name: "Events", align: "right" },
];

export const transfersLatestHead = [
  { name: "Extrinsic ID" },
  { name: "From" },
  { name: "To" },
  { name: "Quantity", align: "right" },
];

export const assetsHead = [
  { name: "Asset ID" },
  { name: "Symbol" },
  { name: "Name" },
  { name: "Owner" },
  { name: "Issuer" },
  { name: "Holders" },
  { name: "Tody Supply", align: "right" },
];

export const addressHead = [
  "Address",
  "Balance",
  "Reserved",
  "Locked",
  "Account Index",
  "Nonce",
];
