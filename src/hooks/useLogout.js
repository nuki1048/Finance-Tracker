import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuth.js";

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // try to log out user
    try {
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });

      // update states
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

  return { logout, isPending, error };
};
export { useLogout };
