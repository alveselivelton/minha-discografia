import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuthValue } from "./useAuthValue";

export const useGetDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const { setLoading } = useAuthValue();

  // cleanup
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document };
};
