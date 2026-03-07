const mongoose = require('mongoose');

const transporterProfileSchema = new mongoose.Schema({
  userId:                   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  transporterName:          { type: String, required: true, trim: true },
  companyType:              { type: String, trim: true },
  registeredOfficeAddress:  { type: String, trim: true },
  establishedYear:          { type: Number },
  areaOfOperation:          [{ type: String }],
  industryExperience:       { type: Number },
  financialYear:            { type: String, trim: true },
  turnover:                 { type: Number },
  netProfit:                { type: Number },
  ownedFleet:               { type: Number },
  contactName:              { type: String, trim: true },
  contactDesignation:       { type: String, trim: true },
  contactPhone:             { type: String, trim: true },
  contactEmail:             { type: String, trim: true, lowercase: true },
  createdAt:                { type: Date, default: Date.now },
});

module.exports = mongoose.model('TransporterProfile', transporterProfileSchema);
