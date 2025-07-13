let orders = []; // เก็บออเดอร์ไว้ในหน่วยความจำชั่วคราว

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, item, sweet, topping, timestamp } = req.body;

    if (!name || !item || !sweet) {
      return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
    }

    orders.push({ name, item, sweet, topping, timestamp });
    res.status(200).json({ message: 'Order received' });

  } else if (req.method === 'GET') {
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
