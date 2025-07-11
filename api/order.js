import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'orders.json');
    const { name, item, sweet, topping, timestamp } = req.body;

    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const orders = JSON.parse(fileData);
      orders.push({ name, item, sweet, topping, timestamp });
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
      res.status(200).json({ message: 'Order received' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save order.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
