import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPage } from 'react-bricks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {API_KEY} = process.env;
    
    if (!API_KEY) {
      throw new Error('API_KEY is not defined');
    }

    if(!req.query.slug) {
      throw new Error('slug is not defined');
    }

    if (req.method === 'GET') {
      const slug = req.query.slug as string;
      const result = await fetchPage(slug, API_KEY, 'en', []);
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