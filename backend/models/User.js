const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
