// src/components/TransportDashboard.js
import axios from 'axios';

export const fetchTransportData = async (companyName = '') => {
  try {
    const baseURL = 'https://wuyuxzmkie.execute-api.us-east-1.amazonaws.com/FetchTransportData';
    const url = companyName
      ? `${baseURL}?company=${encodeURIComponent(companyName)}`
      : baseURL;

    const response = await axios.get(url);
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return data;
  } catch (err) {
    console.error('❌ Failed to fetch transport data', err);
    throw err;
  }
};
