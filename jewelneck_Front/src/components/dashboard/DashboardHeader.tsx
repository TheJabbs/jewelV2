
import React, { useEffect, useState } from 'react';
import { Customer } from '@/types/dashboard';

interface DashboardHeaderProps {
  customer: Customer;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ customer }) => {
  const [username, setUsername] = useState(customer.username);
  const [email, setEmail] = useState(customer.email);

  useEffect(() => {
    // Try to get user data from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.username) {
          setUsername(userData.username);
        }
        if (userData.email) {
          setEmail(userData.email);
        }
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-display font-semibold">Welcome, {username}!</h1>
      <p className="text-muted-foreground mt-1">
        Logged in as {email} • Manage your profile, view your cart and check your order history.
      </p>
    </div>
  );
};

export default DashboardHeader;
