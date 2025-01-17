export const DEFAULT_THEME_COLOR = "#FFF";
export const DEFAULT_THEME_COLOR_SECONDARY = "#BCBCBC";
export const DEFAULT_THEME_BUTTON_COLOR = "#3186FD";
export const DEFAULT_THEME_LOGO = "logo-img-1.svg";

export const nodes = [
  {
    name: "Ulas",
    sub: "Bholdus",
    value: "mainnet",
    symbol: "BHO",
    icon: "/imgs/icons/logo-bholdus.png",
    color: "#fff",
    colorSecondary: "#808191",
    buttonColor: "#3186FD",
    logo: "logo-img-2.svg",
  },
  {
    name: "Cygnus",
    sub: "Bholdus",
    value: "testnet",
    symbol: "BHOT",
    icon: "/imgs/icons/logo-bholdus.png",
    color: "#fff",
    colorSecondary: "#808191",
    buttonColor: "#3186FD",
    logo: "logo-img-2.svg",
  },
  {
    name: "Phoenix",
    sub: "Bholdus",
    value: "devnet",
    symbol: "PHO",
    icon: "/imgs/icons/logo-bholdus.png",
    color: "#fff",
    colorSecondary: "#808191",
    buttonColor: "#3186FD",
    logo: "logo-img-2.svg",
  },
];

export const blocksLatestHead = [
  { name: "Height", width: 136 },
  { name: "Time" },
  { name: "Validator" },
  { name: "Extrinsics", align: "right", width: 136 },
  { name: "Events", align: "right", width: 136 },
];

export const transfersLatestHead = [
  { name: "Extrinsic ID", width: 136 },
  { name: "Time" },
  { name: "From", width: 136 },
  { name: "To", width: 136 },
  { name: "Quantity", align: "right" },
];

export const assetsHead = [
  { name: "Icon", width: 80 },
  { name: "Asset ID", width: 114 },
  { name: "Symbol", width: 136 },
  { name: "Name", width: 152 },
  { name: "Owner", width: 152 },
  { name: "Issuer", width: 152 },
  { name: "Holders", width: 136, align: "center" },
  { name: "Total Supply", align: "center" },
];

export const nftsHead = [
  { name: "ID", width: 136 },
  { name: "Class", width: 100 },
  { name: "Name", width: 332 },
  { name: "Created Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Instance", width: 120 },
  { name: "Status" },
];

export const addressExtrincsHead = [
  { name: "ID", width: 160 },
  { name: "Hash" },
  { name: "Time", type: "time", width: 200 },
  { name: "Result", width: 160 },
  { name: "Action", width: 320 },
  { name: "Data", type: "data", width: 76, display: "table" },
];

export const addressAssetsHead = [
  { name: "Asset ID", width: 136 },
  { name: "Symbol", width: 152 },
  { name: "Name", width: 200 },
  { name: "Balance", align: "right" },
  { name: "Approved", align: "right" },
  { name: "Frozen", align: "right" },
  { name: "Transfer Count", align: "right" },
];

export const addressTransfersHead = [
  { name: "Event ID", width: 136 },
  { name: "Extrinsic ID", width: 136 },
  { name: "Method", width: 200 },
  { name: "Age", type: "time", width: 200 },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
  { name: "Quantity", align: "right" },
];

export const extrinsicEventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const blockExtrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Hash" },
  { name: "Result", width: 160 },
  { name: "Action", width: 320 },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const blockEventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const blockLogsHead = [
  { name: "Log Index", width: 160 },
  { name: "Block", width: 160 },
  { name: "Type" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const assetTransfersHead = [
  { name: "Event ID", width: 136 },
  { name: "Extrinsic ID", width: 136 },
  { name: "Method", width: 200 },
  { name: "Age", type: "time", width: 200 },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
  { name: "Quantity", align: "right" },
];

export const assetHoldersHead = [
  { name: "Rank", width: 96 },
  { name: "Address" },
  { name: "Quantity", width: 300, align: "right" },
];

export const blocksHead = [
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Status", width: 160 },
  { name: "Hash", width: 280 },
  { name: "Validator", width: 152 },
  { name: "Extrinsics", align: "right" },
  { name: "Events", align: "right" },
];

export const extrinsicsHead = [
  { name: "Extrinsics ID", width: 136 },
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsics Hash", width: 200 },
  { name: "Result", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const eventsHead = [
  { name: "Event ID", width: 136 },
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsics Hash", width: 200 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const transfersHead = [
  { name: "Event ID", width: 136 },
  { name: "Block", width: 136 },
  { name: "Method", width: 200 },
  { name: "Time", type: "time", width: 200 },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
  { name: "Value", align: "right" },
];

export const addressesHead = [
  { name: "Rank", width: 96 },
  { name: "Account" },
  { name: "Balance", width: 240, align: "right" },
];

export const teleportsHead = [
  { name: "Extrinsics ID", width: 130 },
  { name: "Time", type: "time", width: 184 },
  { name: "Direction", width: 144 },
  { name: "Receiver", width: 144 },
  { name: "Result", width: 56 },
  { name: "Sent At", width: 128 },
  { name: "Amount", align: "right" },
  { name: "Fee", align: "right" },
  { name: "Total", align: "right" },
];

export const addressHead = [
  "Address",
  "Total Balance",
  "Free",
  "Reserved",
  "Nonce",
];

export const extrinsicHead = [
  "Timestamp",
  "Block",
  "Life Time",
  "Extrinsic Hash",
  "Module",
  "Call",
  "Signer",
  "Tokens Transferred",
  "Nonce",
  "Result",
];

export const blockHead = [
  "Block Time",
  "Status",
  "Hash",
  "Parent Hash",
  "State Root",
  "Extrinsics Root",
  "Validator",
];

export const getAssetHead = (status) => {
  return [
    "Symbol",
    "Name",
    "Asset ID",
    "Owner",
    "Issuer",
    "Total Supply",
    "Decimals",
    ...(status === "Active" ? [] : ["Status"]),
    "Holders",
    "Transfers",
  ];
};

export const eventHead = [
  "Timestamp",
  "Block",
  "Extrinsics ID",
  "Event Index",
  "Module",
  "Event Name",
  "Description",
  "Value",
];

export const timeTypes = {
  age: "age",
  date: "date",
};

export const EmptyQuery = {
  total: 0,
  page: 0,
  pageSize: 10,
  items: [],
};
