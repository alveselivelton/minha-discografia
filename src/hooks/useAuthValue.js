import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthValue = () => useContext(AuthContext);
