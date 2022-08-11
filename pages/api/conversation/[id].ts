import { NextApiRequest, NextApiResponse } from 'next'
import conversations from '../data/conversations.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const conversation = conversations.find(
    (conversation) => conversation.id === req.query.id
  )
  if (!conversation) res.status(404).send('Conversation not found')
  res.status(200).json(conversation)
}
