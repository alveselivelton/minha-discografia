import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuthValue } from "../hooks/useAuthValue";

export const useCreateUser = () => {
  const { setError, setLoading } = useAuthValue();

  const createUser = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  return {
    createUser,
  };
};
