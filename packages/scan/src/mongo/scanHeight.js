const { getStatusCollection } = require("./index");
const asyncLocalStorage = require("../asynclocalstorage");

const genesisHeight = 1;
const mainScanName = "main-scan-height";

async function getNextScanHeight() {
  const statusCol = await getStatusCollection();
  const heightInfo = await statusCol.findOne({ name: mainScanName });

  if (!heightInfo) {
    return genesisHeight;
  } else if (typeof heightInfo.value === "number") {
    return heightInfo.value + 1;
  } else {
    console.error("Scan height value error in DB!");
    process.exit(1);
  }
}

async function updateScanHeight(height) {
  const session = asyncLocalStorage.getStore();
  const statusCol = await getStatusCollection();
  await statusCol.updateOne(
    { name: mainScanName },
    { $set: { value: height } },
    { upsert: true, session }
  );
}

module.exports = {
  getNextScanHeight,
  updateScanHeight,
};
