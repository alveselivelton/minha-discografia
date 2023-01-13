import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuthValue } from "./useAuthValue";

export const useGetDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const { setLoading } = useAuthValue();

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());

        setLoading(false);
      } catch (error) {
        console.log(error.message);

        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id]);

  return { document };
};
