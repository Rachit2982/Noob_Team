import React from 'react';

import { useState } from 'react';
import API from '../services/api';

const TransactionForm = ({ refresh }) => {
  const [type, setType] = useState('spend');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const addTransaction = async () => {
    if (!amount || !description) {
      alert('Please fill all fields');
      return;
    }
    await API.post('/transactions', { type, amount, description });
    setAmount('');
    setDescription('');
    refresh();
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="spend">Spend</option>
        <option value="save">Save</option>
      </select>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={addTransaction}>Add</button>
    </div>
  );
};

export default TransactionForm;
