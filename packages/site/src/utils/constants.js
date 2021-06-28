export const nodes = [
  {
    name: "Westmint",
    sub: "Westend",
    value: "westmint",
    symbol: "WND",
    icon: "/imgs/icons/westend.svg",
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

export const addressExtrincsHead = [
  { name: "ID" },
  { name: "Hash" },
  { name: "Time", type: "time" },
  { name: "Result" },
  { name: "Action" },
  { name: "Data", type: "data" },
];

export const addressAssetsHead = [
  { name: "Asset ID" },
  { name: "Symbol" },
  { name: "Name" },
  { name: "Balance" },
  { name: "Approved" },
  { name: "Frozen" },
  { name: "Transfer Count" },
];

export const addressTransfersHead = [
  { name: "Event ID" },
  { name: "Extrinsic ID" },
  { name: "Method" },
  { name: "Age", type: "time" },
  { name: "From" },
  { name: "To" },
  { name: "Quantity" },
];

export const extrinsicEventsHead = [
  { name: "Event ID" },
  { name: "Action" },
  { name: "Data", type: "data", align: "right" },
];

export const blockExtrinsicsHead = [
  { name: "ID" },
  { name: "Hash" },
  { name: "Result" },
  { name: "Action" },
  { name: "Data", type: "data", align: "right" },
];

export const blockEventsHead = [
  { name: "Event ID" },
  { name: "Extrinsic ID" },
  { name: "Action" },
  { name: "Data", type: "data", align: "right" },
];

export const assetTransfersHead = [
  { name: "Event ID" },
  { name: "Extrinsic ID" },
  { name: "Method" },
  { name: "Age", type: "time" },
  { name: "From" },
  { name: "To" },
  { name: "Quantity" },
];

export const assetHoldersHead = [
  { name: "Rank" },
  { name: "Address" },
  { name: "Quantity" },
];

export const addressHead = [
  "Address",
  "Balance",
  "Reserved",
  "Locked",
  "Nonce",
];

export const extrinsicHead = [
  "Timestamp",
  "Block",
  "Extrinsic Hash",
  "Module",
  "Call",
  "From",
  "Result",
];

export const extrinsicTransferHead = [
  "Timestamp",
  "Block",
  "Extrinsic Hash",
  "Module",
  "Call",
  "From",
  "To",
  "Value",
  "Result",
];

export const blockHead = [
  "Block Time",
  "Status",
  "Hash",
  "Parent Hash",
  "State Root",
  "Extrinsics Root",
  "Validators",
];

export const assetHead = [
  "Symbol",
  "Name",
  "Asset ID",
  "Owner",
  "Issuer",
  "Total Supply",
  "Decimals",
  "Holders",
  "Transfers",
];

export const timeTypes = {
  age: "age",
  date: "date",
};
