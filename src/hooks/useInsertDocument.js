import { useState, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useAuthValue } from "../hooks/useAuthValue";

export const useInsertDocument = (docCollection) => {
  const { setLoading, setError } = useAuthValue();

  // cleanup
  const [cancelled, setCancelled] = useState(false);

  const checkIfCancelled = () => {
    if (cancelled) return;
  };

  const insertDocument = async (document) => {
    checkIfCancelled();

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

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument };
};
