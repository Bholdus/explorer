const { extractExtrinsicEvents, getExtrinsicSigner } = require("../utils");
const { getExtrinsicCollection, getAddressCollection } = require("../mongo");
const { isExtrinsicSuccess } = require("../utils");
const { u8aToHex } = require("@polkadot/util");
const { getApi } = require("../api");

async function updateOrCreateAddress(blockHash, address) {
  const api = await getApi();

  const account = await api.query.system.account.at(blockHash, address);
  if (account) {
    const col = await getAddressCollection();
    await col.updateOne(
      { address },
      {
        $set: {
          ...account.toJSON(),
        },
      },
      { upsert: true }
    );
  }
}

async function handleExtrinsics(extrinsics = [], allEvents = [], indexer) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);

    await handleExtrinsic(
      extrinsic,
      {
        ...indexer,
        index: index++,
      },
      events
    );
  }
}

/**
 *
 * 解析并处理交易
 *
 */
async function handleExtrinsic(extrinsic, indexer, events) {
  const hash = extrinsic.hash.toHex();
  const callIndex = u8aToHex(extrinsic.callIndex);
  const { args } = extrinsic.method.toJSON();
  const name = extrinsic.method.method;
  const section = extrinsic.method.section;
  let signer = extrinsic._raw.signature.get("signer").toString();
  //如果signer的解析长度不正确，则该交易是无签名交易
  if (signer.length < 48) {
    signer = "";
  }

  const isSuccess = isExtrinsicSuccess(events);

  const version = extrinsic.version;
  const data = u8aToHex(extrinsic.data); // 原始数据

  const doc = {
    hash,
    indexer,
    signer,
    section,
    name,
    callIndex,
    version,
    args,
    data,
    isSuccess,
  };

  const exCol = await getExtrinsicCollection();
  const result = await exCol.insertOne(doc);
  if (result.result && !result.result.ok) {
    // FIXME: 处理交易插入不成功的情况
  }

  if (signer) {
    await updateOrCreateAddress(indexer.blockHash, signer);
  }
}

function normalizeExtrinsic(extrinsic, events) {
  if (!extrinsic) {
    throw new Error("Invalid extrinsic object");
  }

  const hash = extrinsic.hash.toHex();
  const callIndex = u8aToHex(extrinsic.callIndex);
  const { args } = extrinsic.method.toJSON();
  const name = extrinsic.method.method;
  const section = extrinsic.method.section;
  const signer = getExtrinsicSigner(extrinsic);

  const isSuccess = isExtrinsicSuccess(events);

  const version = extrinsic.version;
  const data = u8aToHex(extrinsic.data); // 原始数据

  return {
    hash,
    signer,
    section,
    name,
    callIndex,
    version,
    args,
    data,
    isSuccess,
  };
}

module.exports = {
  handleExtrinsics,
  normalizeExtrinsic,
};
