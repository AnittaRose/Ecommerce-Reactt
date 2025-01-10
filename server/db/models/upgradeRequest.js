// ../db/models/upgradeRequest.js

const mongoose = require("mongoose");

const upgradeRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  companyName: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  status: { type: String, default: "pending" },
  submittedAt: { type: Date, default: Date.now },
});

const UpgradeRequest = mongoose.model("UpgradeRequest", upgradeRequestSchema);

module.exports = UpgradeRequest;
