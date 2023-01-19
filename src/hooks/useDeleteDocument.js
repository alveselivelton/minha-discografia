import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthValue } from "../hooks/useAuthValue";

export const useDeleteDocument = (docCollection) => {
  const { setLoading } = useAuthValue();

  // cleanup
  const [cancelled, setCancelled] = useState(false);

  const checkIfCancelled = () => {
    if (cancelled) return;
  };

  const deleteDocument = async (id) => {
    checkIfCancelled();

    setLoading(true);

    try {
      await deleteDoc(doc(db, docCollection, id));

      setLoading(false);
    } catch (error) {
      console.log(error.message);

      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument };
};
