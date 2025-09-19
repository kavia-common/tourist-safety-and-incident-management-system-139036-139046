'use strict';
const digitalIdModel = require('../models/digitalIdModel');

// PUBLIC_INTERFACE
async function createDigitalId(input) {
  /** Create a digital ID record (hash could later be anchored on blockchain) */
  // Placeholder for blockchain plug-in
  // e.g., const txHash = await blockchainService.anchorHash(input.metadataHash);
  return digitalIdModel.createDigitalId(input);
}

// PUBLIC_INTERFACE
async function verifyDigitalId({ passportNo, fullName }) {
  /** Verify if a provided passport and name matches a known digital ID */
  const record = await digitalIdModel.verifyByPassport(passportNo, fullName);
  return { valid: !!record, record };
}

// PUBLIC_INTERFACE
async function getUserDigitalIds(userId) {
  /** List user's digital IDs */
  return digitalIdModel.getByUser(userId);
}

module.exports = {
  createDigitalId,
  verifyDigitalId,
  getUserDigitalIds
};
