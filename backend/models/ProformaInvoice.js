const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProformaInvoiceSchema = new Schema({
  companyName: { type: String, required: true },
  companyAddress1: { type: String, required: true },
  companyAddress2: { type: String },
  companyPAN: { type: String, required: true },
  companyGSTIN: { type: String, required: true },
  cgstRate: { type: Number, required: true },
  sgstRate: { type: Number, required: true },
  adjustment: { type: Number, required: true },
  history: [{
    companyName: { type: String, required: true },
    companyAddress1: { type: String, required: true },
    companyAddress2: { type: String },
    companyPAN: { type: String, required: true },
    companyGSTIN: { type: String, required: true },
    cgstRate: { type: Number, required: true },
    sgstRate: { type: Number, required: true },
    adjustment: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const ProformaInvoice = mongoose.model('ProformaInvoice', ProformaInvoiceSchema);
module.exports = ProformaInvoice;
