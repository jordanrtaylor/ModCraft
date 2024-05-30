import axios from 'axios';

const API_URL = 'http://localhost:5000/api/subscription';

const createSubscription = (token, paymentMethodId) => {
  return axios.post(`${API_URL}/create`, { paymentMethodId }, {
    headers: {
      'Authorization': token
    }
  });
};

export { createSubscription };
