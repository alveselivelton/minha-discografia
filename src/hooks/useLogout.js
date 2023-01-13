import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export const useLogout = () => {
  const logout = async () => {
    signOut(auth);
  };

  return {
    logout,
  };
};
