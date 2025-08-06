const express = require('express');
const { addTransaction, getTransactions, getBalance } = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addTransaction);
router.get('/', auth, getTransactions);
router.get('/balance', auth, getBalance);

module.exports = router;
