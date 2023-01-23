import { useState, useEffect } from "react";
import { useAuthValue } from "../hooks/useAuthValue";
import { db } from "../services/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useGetDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState("");
  const { setLoading } = useAuthValue();

  // cleanup
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = () => {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = query(
            collectionRef,
            where("tags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents };
};
