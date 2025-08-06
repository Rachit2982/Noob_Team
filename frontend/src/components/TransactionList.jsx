const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            <strong>{t.type.toUpperCase()}</strong>: ₹{t.amount} - {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
