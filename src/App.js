import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-config';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from 'aws-amplify/auth';


import AdminDashboard from './components/AdminDashboard';
import CompanyOneDashboard from './components/CompanyOneDashboard';
import CompanyTwoDashboard from './components/CompanyTwoDashboard';

Amplify.configure(awsConfig);

function App({ signOut, user }) {
  const [role, setRole] = useState('');

  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
        const roleAttr = attributes['custom:role']?.toLowerCase();
        console.log("Fetched custom:role:", roleAttr);
        setRole(roleAttr);
      } catch (err) {
        console.error('Error fetching attributes:', err);
      }
    };

    getUserAttributes();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user.username}</h2>
      <p>Role: <strong>{role}</strong></p>

      {role === 'admin' && <AdminDashboard />}
      {role === 'abc' && <CompanyOneDashboard />}
      {role === 'xyz' && <CompanyTwoDashboard />}
      {!['admin', 'abc', 'xyz'].includes(role) && (
        <p style={{ color: 'red' }}>No dashboard found for your role.</p>
      )}

      <button onClick={signOut} style={{ marginTop: '1rem' }}>
        Sign Out
      </button>
    </div>
  );
}

export default withAuthenticator(App);
