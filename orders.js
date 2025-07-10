import { readFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'orders.json');
  try {
    const data = await readFile(filePath, 'utf-8');
    const orders = JSON.parse(data);
    res.status(200).json(orders.filter(o => !o.done));
  } catch {
    res.status(200).json([]);
  }
}