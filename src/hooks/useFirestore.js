import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timeStamp } from "../firebase/config.js";

function firestoreReducer(state, action) {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        error: null,
        success: null,
        document: null,
      };
    case "ADD_NEW":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "NEW_ERROR":
      return {
        ...state,
        document: null,
        isPending: false,
        success: false,
        error: action.payload,
      };
    case "DELETE_DOC":
      return {
        ...state,
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
}
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // collection ref
  const ref = projectFirestore.collection(collection);

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addedDocument = await ref.add({ createdAt, ...doc });
      dispatchIfNotCancelled({ type: "ADD_NEW", payload: addedDocument });
    } catch (e) {
      dispatchIfNotCancelled({ type: "NEW_ERROR", payload: e.message });
    }
  };
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = await ref.doc(id).delete();
      console.log(deletedDocument);
      const filteredResponse = response.document.filter(
        (item) => item.id !== id
      );
      dispatchIfNotCancelled({ type: "DELETE_DOC", payload: filteredResponse });
    } catch (err) {
      dispatchIfNotCancelled({ type: "NEW_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
};
export { useFirestore };
