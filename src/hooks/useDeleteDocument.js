import { db } from "../services/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

import { useAuthValue } from "../hooks/useAuthValue";

export const useDeleteDocument = (docCollection) => {
  const { setLoading } = useAuthValue();

  const deleteDocument = async (id) => {
    setLoading(true);

    try {
      await deleteDoc(doc(db, docCollection, id));

      setLoading(false);
    } catch (error) {
      console.log(error.message);

      setLoading(false);
    }
  };

  return { deleteDocument };
};
