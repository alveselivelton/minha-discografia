import { db } from "../services/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { useAuthValue } from "./useAuthValue";

export const useUpdateDocument = (docCollection) => {
  const { setLoading } = useAuthValue();

  const updateDocument = async (id, data) => {
    setLoading(true);

    try {
      const docRef = doc(db, docCollection, id);
      await updateDoc(docRef, data);

      setLoading(false);
    } catch (error) {
      console.log(error.message);

      setLoading(false);
    }
  };
  return { updateDocument };
};
