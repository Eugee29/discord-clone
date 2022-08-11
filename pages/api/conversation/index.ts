import { NextApiRequest, NextApiResponse } from 'next'
import conversations from '../data/conversations.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(conversations)
}
