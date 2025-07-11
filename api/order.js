// เก็บรายการออเดอร์ไว้ในหน่วยความจำ (RAM)
let orders = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, item, sweet, topping, timestamp } = req.body;

    // ตรวจสอบข้อมูลที่ส่งมา
    if (!name || !item || !sweet) {
      return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
    }

    // เพิ่มรายการใหม่เข้าอาร์เรย์
    orders.push({ name, item, sweet, topping, timestamp });

    // ตอบกลับว่ารับออเดอร์แล้ว
    res.status(200).json({ message: 'Order received' });

  } else if (req.method === 'GET') {
    // ส่งข้อมูลออเดอร์ทั้งหมดกลับไป
    res.status(200).json(orders);

  } else {
    // ไม่อนุญาตเมธอดอื่น
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
