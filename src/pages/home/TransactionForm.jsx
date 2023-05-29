import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore.js";
import AnimatedComponent from "../../components/animatedComponent/AnimatedComponent.jsx";

// eslint-disable-next-line react/prop-types
const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { response, addDocument } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name, amount, uid });
  };
  useEffect(() => {
    if (response.success) {
      setAmount("");
      setName("");
    }
  }, [response.success]);

  return (
    <AnimatedComponent>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name: </span>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </label>
        {!response.isPending && <button>Add transaction</button>}
        {response.isPending && <button>Loading...</button>}
      </form>
    </AnimatedComponent>
  );
};

export default TransactionForm;
