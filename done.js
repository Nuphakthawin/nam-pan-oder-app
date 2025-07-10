import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId } = req.query;
    const filePath = path.join(process.cwd(), 'data', 'orders.json');
    let orders = [];
    try {
      const data = await readFile(filePath, 'utf-8');
      orders = JSON.parse(data);
    } catch {}
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].done = true;
      await writeFile(filePath, JSON.stringify(orders, null, 2));
      res.status(200).json({ message: 'Marked done' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}