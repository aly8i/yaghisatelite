import { useEffect, useContext, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  doc,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { UserContext } from "../context/Usercontext";
import { useSession } from "next-auth/react";
export const fetchUsers = () => {
  const { setData, setFData } = useContext(UserContext);
  const usersRef = collection(db, "users");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const usersQuery = query(usersRef, where("name", "!=", null));

        const unsubscribe = onSnapshot(usersQuery, async (snapshot) => {
          if (!snapshot.empty) {
            const usersDataPromises = snapshot.docs.map(async (doc) => {
              const id = doc.id;
              const data = doc.data();
              return { id, ...data };
            });

            // Wait for all promises to resolve
            const usersData = await Promise.all(usersDataPromises);

            // Update the context with the fetched data
            setData(usersData);
            setFData(usersData);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // No return statement or value is needed
};
export const fetchLogin = () => {
  const { status } = useSession();

  useEffect(() => {
    const currentUrl = window.location.href;
    if (
      status == "loading" ||
      currentUrl == "https://yaghisatelite.vercel.app" ||
      currentUrl == "https://yaghisatelite.vercel.app/"
    )
      return;

    if (status == "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);
};
export const fetchAdmin = () => {
  const { setAdmin } = useContext(UserContext);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const adminRef = collection(db, "admin");
        const adminDoc = doc(adminRef, "1");
        const querySnapshot = await getDoc(adminDoc);
        const data = { ...querySnapshot.data(), id: adminDoc.id };
        setAdmin(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments();
  }, []);
};
