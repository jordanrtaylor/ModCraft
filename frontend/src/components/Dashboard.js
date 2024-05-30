import React, { useState } from 'react';
import { createSubscription } from '../services/subscriptionService';

const Dashboard = ({ token }) => {
  const [paymentMethodId, setPaymentMethodId] = useState('');

  const handleSubscription = async (e) => {
    e.preventDefault();
    try {
      await createSubscription(token, paymentMethodId);
      alert('Subscription created successfully');
    } catch (error) {
      console.error('Subscription failed', error);
    }
  };

  return (
    <div>
      <h1>Welcome to ModCraft Dashboard!</h1>
      <form onSubmit={handleSubscription}>
        <div>
          <label>Payment Method ID</label>
          <input type="text" value={paymentMethodId} onChange={(e) => setPaymentMethodId(e.target.value)} />
        </div>
        <button type="submit">Subscribe for $2.50/month</button>
      </form>
    </div>
  );
};

export default Dashboard;
