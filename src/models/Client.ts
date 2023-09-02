import mongoose, { Schema } from "mongoose";

const ClientSchema = new mongoose.Schema({
  client: {type: String, required: true},
  sector: {type: String, required: true},
  country: {type: String, required: true},
  engagementScope: {type: String, required: true},
  shariaGovernanceReference: {type: String, required: true},
  equityClassification: {type: String, required: true},
});

export const ClientModel = mongoose.model("Client", ClientSchema);
