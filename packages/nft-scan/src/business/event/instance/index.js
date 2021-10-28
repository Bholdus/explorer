const { Modules, UniquesEvents } = require("../../common/constants");
const { handleApprovalCancelled } = require("./approvalCancelled");
const { handleApprovedTransfer } = require("./approvedTransfer");
const { handleBurned } = require("./burned");
const { handleFrozen } = require("./frozen");
const { handleIssued } = require("./issued");
const { handleMetadataCleared } = require("./metadataCleared");
const { handleMetadataSet } = require("./metadataSet");
const { handleThawed } = require("./thawed");
const { handleTransferred } = require("./transferred");

async function handleEvent(event, indexer, blockEvents, extrinsic) {
  const { section, method } = event;
  if (Modules.Uniques !== section) {
    return;
  }

  if (UniquesEvents.Issued === method) {
    await handleIssued(...arguments);
  } else if (UniquesEvents.Transferred === method) {
    await handleTransferred(...arguments);
  } else if (UniquesEvents.ApprovedTransfer === method) {
    await handleApprovedTransfer(...arguments);
  } else if (UniquesEvents.ApprovalCancelled === method) {
    await handleApprovalCancelled(...arguments);
  } else if (UniquesEvents.Burned === method) {
    await handleBurned(...arguments);
  } else if (UniquesEvents.Frozen === method) {
    await handleFrozen(...arguments);
  } else if (UniquesEvents.Thawed === method) {
    await handleThawed(...arguments);
  } else if (UniquesEvents.MetadataSet === method) {
    await handleMetadataSet(...arguments);
  } else if (UniquesEvents.MetadataCleared === method) {
    await handleMetadataCleared(...arguments);
  }
}

module.exports = {
  handleEvent,
};
