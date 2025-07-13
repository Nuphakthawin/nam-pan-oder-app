// /api/order.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsDV4gEEQZpJdK9sccKQLMG-vAEc9-KUc",
  authDomain: "nampanorder.firebaseapp.com",
  projectId: "nampanorder",
  storageBucket: "nampanorder.appspot.com",
  messagingSenderId: "123907265628",
  appId: "1:123907265628:web:b52fe97f50d4f97a57c299"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, item, sweet, topping, note, timestamp } = req.body;

      // ✅ เพิ่มตรงนี้
      console.log('📦 รับออเดอร์ใหม่:');
      console.log('ชื่อ:', name);
      console.log('เมนู:', item);
      console.log('หวาน:', sweet);
      console.log('ท้อปปิ้ง:', topping);
      console.log('รายละเอียด:', note);
      console.log('เวลา:', timestamp);

      await addDoc(collection(db, "orders"), {
        name, item, sweet, topping, note, timestamp
      });

      console.log('✅ บันทึกลง Firebase เรียบร้อย');

      res.status(200).json({ message: "Order saved to Firebase" });
    } catch (error) {
      console.error("❌ Firebase error:", error);
      res.status(500).json({ error: "Failed to save order to Firebase." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
