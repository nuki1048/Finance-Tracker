import styles from "./Home.module.css";

import TransactionForm from "./TransactionForm.jsx";
import { useAuthContext } from "../../hooks/useAuth.js";
import { useCollection } from "../../hooks/useCollection.js";
import TransactionList from "./TransactionList.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import { useEffect, useState } from "react";
import AnimatedComponent from "../../components/animatedComponent/AnimatedComponent.jsx";
const Home = () => {
  const { user } = useAuthContext();
  const { data, error } = useCollection(
    `transactions`,
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (data) {
      let counter = 0;
      data.map((item) => (counter += Number(item.amount)));
      setTotalAmount(counter);
    }
  }, [data]);

  return (
    <AnimatedComponent mode={"wait"}>
      <h3 className={styles.counter}>
        Total amount of transactions: {totalAmount}
      </h3>
      <div className={styles.container}>
        <div className={styles.content}>
          {error && <p>{error}</p>}
          {data && <TransactionList transactions={data} />}
          {!data && !error && <Spinner />}
        </div>
        <div className={styles.sidebar}>
          <TransactionForm uid={user.uid} />
        </div>
      </div>
    </AnimatedComponent>
  );
};

Home.propTypes = {};

export default Home;
