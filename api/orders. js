import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'orders.json');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const orders = JSON.parse(data);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error reading orders.json:', err);
    res.status(500).json({ error: 'Failed to read orders' });
  }
}
