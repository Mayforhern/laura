const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TherapyConsentModule", (m) => {
  const therapyConsent = m.contract("TherapyConsent");
  return { therapyConsent };
});
