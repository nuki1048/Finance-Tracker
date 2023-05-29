import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuth.js";
export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error("We cant login you right now,check your data");
      }

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      if (!isCancelled) {
        console.log(e.message);
        setError(e.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);
  return { isPending, error, login };
};
