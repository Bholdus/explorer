require("dotenv").config();

const { getApi, disconnect } = require("./api");
const { updateHeight, getLatestHeight } = require("./chain");
const { getNextScanHeight, updateScanHeight } = require("./mongo/scanHeight");
const { sleep } = require("./utils/sleep");
const { getBlocks } = require("./mongo/meta");
const { hexToU8a } = require("@polkadot/util");
const { GenericBlock } = require("@polkadot/types");
const { handleBlock } = require("./block");
const { getBlockIndexer } = require("./block/getBlockIndexer");
const { handleExtrinsics } = require("./extrinsic");
const { handleEvents } = require("./event");
const { logger } = require("./logger");
const { isHex } = require("./utils");

let registry;

async function main() {
  await updateHeight();

  let scanHeight = await getNextScanHeight();
  while (true) {
    const chainHeight = getLatestHeight();
    if (scanHeight > chainHeight) {
      // Just wait if the to scan height greater than current chain height
      await sleep(1000);
      continue;
    }

    let targetHeight = chainHeight;
    if (scanHeight + 100 < chainHeight) {
      targetHeight = scanHeight + 100;
    }

    const blocks = await getBlocks(scanHeight, targetHeight);
    if ((blocks || []).length <= 0) {
      await sleep(1000);
      continue;
    }

    for (const block of blocks) {
      // TODO: do following operations in one transaction
      await scanBlock(block);
      await updateScanHeight(block.height);
    }

    logger.info(`block ${targetHeight} done`);
    scanHeight = targetHeight + 1;
    await sleep(1);
  }
}

async function scanBlock(blockInDb) {
  if (!registry || registry.specVersion.toNumber() !== blockInDb.specVersion) {
    registry = await getRegistryByHeight(blockInDb.height);
  }

  let block;
  if (isHex(blockInDb.block)) {
    block = new GenericBlock(registry.registry, hexToU8a(blockInDb.block));
  } else {
    block = new GenericBlock(registry.registry, blockInDb.block.block);
  }

  const blockEvents = registry.registry.createType(
    "Vec<EventRecord>",
    blockInDb.events,
    true
  );
  const author =
    blockInDb.author &&
    registry.registry.createType("AccountId", blockInDb.author, true);

  await handleBlock(block, blockEvents, author);
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block.extrinsics, blockEvents, blockIndexer);
  await handleEvents(blockEvents, blockIndexer, block.extrinsics);
}

async function getRegistryByHeight(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);

  return await api.getBlockRegistry(blockHash);
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error)
  .finally(cleanUp);

async function cleanUp() {
  await disconnect();
}
