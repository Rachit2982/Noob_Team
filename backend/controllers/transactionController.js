const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
    const { type, amount, description } = req.body;
    try {
        const transaction = new Transaction({ userId: req.user.id, type, amount, description });
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    const { from, to } = req.query;
    let filter = { userId: req.user.id };
    if (from && to) {
        filter.date = { $gte: new Date(from), $lte: new Date(to) };
    }
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
};

exports.getBalance = async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user.id });
    let balance = 0;
    transactions.forEach(t => {
        if (t.type === 'save') balance += t.amount;
        else balance -= t.amount;
    });
    res.json({ balance });
};
