import { db } from "./Firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteDoc } from "firebase/firestore";

export const getUser = async (id) => {
  try {
    const usersRef = collection(db, "users");
    const userDoc = doc(usersRef, id);
    const querySnapshot = await getDoc(userDoc);
    if (querySnapshot.empty) {
      toast.warning("الاسم غير موجود");
      return null;
    } else {
      const userData = { ...querySnapshot.data(), id: userDoc.id };
      return userData;
    }
  } catch (error) {
    toast.error("Error getting the user");
  }
};

export const getAdmin = async () => {
  try {
    const adminRef = collection(db, "admin");
    const adminDoc = doc(adminRef, "1");
    const querySnapshot = await getDoc(adminDoc);
    if (querySnapshot.empty) {
      toast.warning("الاسم غير موجود");
      return null;
    } else {
      const Data = { ...querySnapshot.data(), id: adminDoc.id };
      return Data;
    }
  } catch (error) {
    toast.error("Error getting the admin");
  }
};

export const addUser = async (name, box, month, year, number) => {
  if (name == "" || box == "" || month == "" || year == "" || number == "") {
    toast.warning("الرجاء ادخال جميع المعلومات");
    return;
  }
  try {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(usersQuery);
    if (!querySnapshot.empty) {
      toast.warning("الاسم موجود");
    } else {
      const data = {
        name,
        box,
        month: parseInt(month),
        year: parseInt(year),
        number,
      };
      await addDoc(usersRef, data);
      window.location.href = "/dashboard";
    }
    toast.success("تمت الأضافة بنجاح");
  } catch (error) {
    toast.error("حصل عطل");
  }
};

export const editUser = async (id, name, box, month, year, number) => {
  try {
    if (
      !id ||
      name === "" ||
      box === "" ||
      month === "" ||
      year === "" ||
      number === ""
    ) {
      toast.warning("الرجاء ادخال جميع المعلومات");
      return;
    }

    const usersRef = collection(db, "users");
    if (id) {
      const userDoc = doc(usersRef, id);
      const data = {
        name,
        box,
        month: parseInt(month),
        year: parseInt(year),
        number,
      };
      await updateDoc(userDoc, data);
    }

    window.location.href = "/dashboard";
    toast.success("الاسم تغير");
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};

export const editAdmin = async (rate, price, username, password) => {
  try {
    if (rate === 0 || price === 0 || username === "" || password === "") {
      toast.warning("الرجاء ادخال جميع المعلومات");
      return;
    }

    const adminRef = collection(db, "admin");
    const adminDoc = doc(adminRef, "1");
    const data = {
      rate,
      price,
      username,
      password,
    };
    await updateDoc(adminDoc, data);

    window.location.href = "/dashboard";
    toast.success("حفظة المعلومات");
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};
export const deleteUser = async (id) => {
  try {
    const usersRef = collection(db, "users");
    if (id) {
      const userDoc = doc(usersRef, id);
      await deleteDoc(userDoc);
    }
    toast.success("لقد تم المسح");
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};

export const getTodayTotal = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const invoicesRef = collection(db, "invoices");
    const invoicesQuery = query(invoicesRef);

    const querySnapshot = await getDocs(invoicesQuery);

    if (querySnapshot.empty) {
      return 0;
    }

    var total = 0;

    querySnapshot.forEach((doc) => {
      if (
        doc.data().date.toDate().toLocaleDateString() ===
        today.toLocaleDateString()
      ) {
        total += doc.data().amount;
      }
    });
    return total;
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};

export const getMonthsTotal = async () => {
  try {
    const invoicesRef = collection(db, "invoices");
    const invoicesQuery = query(invoicesRef);
    const querySnapshot = await getDocs(invoicesQuery);

    if (querySnapshot.empty) {
      return [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
    }

    var months = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    querySnapshot.forEach((doc) => {
      // Extract date from each document
      const docDate = doc.data().date.toDate();
      const docMonth = docDate.getMonth();
      const docYear = docDate.getFullYear();
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const currentYear = currentDate.getFullYear();
      const prevYear = currentDate.getFullYear() - 1;
      if (docYear === currentYear) {
        months[docMonth] += doc.data().amount;
      } else if (docYear === prevYear) {
        months[docMonth + 12] += doc.data().amount;
      }
    });

    return months;
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
    return [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]; // Return a default value or handle the error accordingly
  }
};
