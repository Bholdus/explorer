const { findRegistry } = require("../specs");
const { getBlocksByHeights } = require("../mongo/meta");
const { findBlockApi } = require("../spec/blockApi");
const { getApi } = require("../api");
const { extractAuthor } = require("@polkadot/api-derive/type/util");
const { logger } = require("../logger");
const { GenericBlock } = require("@polkadot/types");

async function fetchBlocks(heights = []) {
  if (process.env.USE_META) {
    return await fetchBlocksFromDb(heights);
  } else {
    return await fetchBlocksFromNode(heights);
  }
}

async function constructBlockFromDbData(blockInDb) {
  const registry = await findRegistry(blockInDb.height);
  const block = new GenericBlock(registry, blockInDb.block.block);
  const allEvents = registry.createType(
    "Vec<EventRecord>",
    blockInDb.events,
    true
  );

  return {
    height: blockInDb.height,
    block,
    events: allEvents,
    author: blockInDb.author,
  };
}

async function fetchBlocksFromDb(heights = []) {
  const blocksInDb = await getBlocksByHeights(heights);

  const blocks = [];
  for (const blockInDb of blocksInDb) {
    let block;
    try {
      block = await constructBlockFromDbData(blockInDb);
    } catch (e) {
      logger.error(
        `can not construct block from db data at ${blockInDb.height}`,
        e
      );
      block = await fetchOneBlockFromNode(blockInDb.height);
    }

    blocks.push(block);
  }

  return blocks;
}

async function fetchBlocksFromNode(heights = []) {
  const allPromises = [];
  for (const height of heights) {
    allPromises.push(fetchOneBlockFromNode(height));
  }

  return await Promise.all(allPromises);
}

async function fetchOneBlockFromNode(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await findBlockApi(blockHash);

  const promises = [
    api.rpc.chain.getBlock(blockHash),
    blockApi.query.system.events(),
  ];

  if (blockApi.query.session?.validators) {
    promises.push(blockApi.query.session.validators());
  }

  const [block, events, validators] = await Promise.all(promises);

  let author = null;
  if (validators) {
    const digest = api.registry.createType(
      "Digest",
      block.block.header.digest,
      true
    );

    author = extractAuthor(digest, validators);
  }

  return {
    height,
    block: block.block,
    events,
    author,
  };
}

module.exports = {
  fetchBlocks,
};
