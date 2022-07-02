import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPages } from 'react-bricks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {API_KEY} = process.env;
    
    if (!API_KEY) {
      throw new Error('API_KEY is not defined');
    }

    if(!req.query.type) {
      throw new Error('type is not defined');
    }

    if (req.method === 'GET') {
      const types = (req.query.type as string).split(',');
      const result = await fetchPages(API_KEY, { sort: "-publishedAt", types, pageSize: (req.query?.limit || 3) as any });
      const body = result;
      res.status(200).json(body);
    } else {
      res.status(405).json({
        message: 'Method not allowed',
      });
    }

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}