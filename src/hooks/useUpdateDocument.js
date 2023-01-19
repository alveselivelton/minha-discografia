import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { useAuthValue } from "./useAuthValue";

export const useUpdateDocument = (docCollection) => {
  const { setLoading } = useAuthValue();

  // cleanup
  const [cancelled, setCancelled] = useState(false);

  const checkIfCancelled = () => {
    if (cancelled) return;
  };

  const updateDocument = async (id, data) => {
    checkIfCancelled();

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

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument };
};
