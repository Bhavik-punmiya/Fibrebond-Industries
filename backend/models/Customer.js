const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillingAddressSchema = new Schema({
  firstName: String,
  lastName: String,
  companyName: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  postalCode: String,
  country: String,
  state: String,
  email: String,
  phoneNumber: String,
});

const ShippingAddressSchema = new Schema({
  firstName: String,
  lastName: String,
  company: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  postalCode: String,
  country: String,
  state: String,
  phoneNumber: String,
});

const TaxInformationSchema = new Schema({
  gstIn: String,
  gstName: String,
  panCard: String,
});

const PaymentInfoSchema = new Schema({
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  pastPayments: [
    {
      paymentLink: String,
      successful: Boolean,
    },
  ],
});

const CustomerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, sparse: true },
  phoneNumber: { type: String, unique: true, sparse: true },
  familyName: String,
  role: { type: String, enum: ['admin', 'shopmanager', 'customer'], default: 'customer' },
  username: String,
  avatarUrl: String,
  isPayingCustomer: Boolean,
  billingAddress: BillingAddressSchema,
  shippingAddresses: [ShippingAddressSchema],
  orders: [String], // Array of order IDs as strings
  taxInformation: TaxInformationSchema,
  paymentInfo: PaymentInfoSchema,
  avatarUrl: String,
  documentUrl: String,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  families: [{ type: String }], // Array of family names
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
