import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useAuthValue } from "../hooks/useAuthValue";

export const useInsertDocument = (docCollection) => {
  const { setLoading, setError } = useAuthValue();

  const insertDocument = async (document) => {
    setLoading(true);
    setError(null);

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      await addDoc(collection(db, docCollection), newDocument);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { insertDocument };
};
