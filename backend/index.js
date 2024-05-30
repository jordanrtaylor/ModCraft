const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscription');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
