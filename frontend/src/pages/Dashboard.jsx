import React from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await API.get('/transactions');
      setTransactions(data);
      const balanceRes = await API.get('/transactions/balance');
      setBalance(balanceRes.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Account Balance: ₹{balance}</p>
      <TransactionForm refresh={fetchData} />
      <TransactionList transactions={transactions} />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
