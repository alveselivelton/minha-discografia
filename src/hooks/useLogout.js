import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export const useLogout = () => {
  // cleanup
  const [cancelled, setCancelled] = useState(false);

  const checkIfCancelled = () => {
    if (cancelled) return;
  };

  const logout = async () => {
    checkIfCancelled();

    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    logout,
  };
};
