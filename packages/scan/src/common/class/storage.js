const { getApi } = require("../../api");
const { findBlockApi } = require("../../spec/blockApi");

async function queryClassDetails(classId, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  const raw = await blockApi.query.uniques.class(classId);
  return raw.toJSON();
}

async function getClassByHeight(classId, blockHeight) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  return queryClassDetails(classId, {
    blockHeight,
    blockHash,
  });
}

module.exports = {
  queryClassDetails,
  getClassByHeight,
};
