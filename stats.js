import { readFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'orders.json');
  try {
    const data = await readFile(filePath, 'utf-8');
    const orders = JSON.parse(data);
    const countMap = {};
    for (const o of orders) {
      if (!countMap[o.menu]) countMap[o.menu] = 0;
      countMap[o.menu]++;
    }
    const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
    res.status(200).json(Object.fromEntries(sorted));
  } catch {
    res.status(200).json({});
  }
}