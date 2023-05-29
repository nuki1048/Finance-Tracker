import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config.js";

const useCollection = (collection, _query, _orderBy) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.map((item) => {
          results.push({ ...item.data(), id: item.id });
        });
        setData(results);
      },
      (err) => {
        console.log(err.message);
        // setError(err.message);
        setError("could not fetch the data");
      }
    );
    return () => unsub();
  }, [collection, query, orderBy]);

  return { error, data };
};
export { useCollection };
