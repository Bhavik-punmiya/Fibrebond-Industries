const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define individual schemas
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

// Define the main User schema
const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  familyName: String,
  role: String,
  username: String,
  email: { type: String, unique: true, required: true },
  avatarUrl: String,
  isPayingCustomer: Boolean,
  billingAddress: BillingAddressSchema,
  shippingAddresses: [ShippingAddressSchema],
  orders: [String], // Array of order IDs as strings
  taxInformation: TaxInformationSchema,
  paymentInfo: PaymentInfoSchema,
  dateCreated: Date,
  dateModified: Date,
});

// Create models from the schemas
const User = mongoose.model('User', UserSchema);

// Export the models
module.exports = { User };
