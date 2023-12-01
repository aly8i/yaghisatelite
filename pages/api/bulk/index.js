import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid payload format" });
  }

  for (const userData of data) {
    try {
      await addDoc(collection(db, "users"), userData);
    } catch (error) {
      console.error("Error adding user to Firebase:", error);
    }
  }

  return res.status(200).json({ success: true });
};

export default handler;
