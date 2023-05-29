import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuth.js";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }
      await response.user.updateProfile({ displayName }); // in this line we update a displayName of user

      //dipatch login user
      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      if (!isCancelled) {
        setError(e.message);
        setIsPending(false);
        console.log(e.message);
      }
    }
  };
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
