const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });
  await user.save();
  res.status(201).send('User registered');
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

const createSubscription = async (req, res) => {
  const { userId, paymentMethodId } = req.body;
  const user = await User.findById(userId);
  const customer = await stripe.customers.create({
    payment_method: paymentMethodId,
    email: user.email,
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: process.env.STRIPE_PLAN_ID }],
    expand: ['latest_invoice.payment_intent'],
  });
  user.stripeCustomerId = customer.id;
  user.stripeSubscriptionId = subscription.id;
  await user.save();
  res.json(subscription);
};

module.exports = {
  register,
  login,
  createSubscription,
};
