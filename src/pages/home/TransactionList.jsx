import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore.js";
import { AnimatePresence, motion } from "framer-motion";
// eslint-disable-next-line react/prop-types
const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <ul className={styles.transactions}>
      <AnimatePresence>
        {/* eslint-disable-next-line react/prop-types */}
        {transactions.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles.name}>{item.name}</p>
            <p className={styles.amount}>${item.amount}</p>
            <button onClick={() => deleteDocument(item.id)}>Delete</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TransactionList;
