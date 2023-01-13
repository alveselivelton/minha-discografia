import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children, value }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { user } = value;

  return (
    <AuthContext.Provider
      value={{ user, error, setError, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
