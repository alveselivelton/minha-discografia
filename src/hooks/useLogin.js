import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuthValue } from "../hooks/useAuthValue";

export const useLogin = () => {
  const { setError, setLoading } = useAuthValue();

  const login = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  return {
    login,
  };
};
