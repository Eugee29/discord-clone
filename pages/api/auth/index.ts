import { NextApiRequest, NextApiResponse } from 'next'
import { authService } from '../services/auth.service'
import { userService } from '../services/user.service'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // Get current logged in user
    case 'GET':
      try {
        const userCredentials = await authService.getCurrentUser()
        if (!userCredentials) return res.send(null)
        const user = await userService.getUser(userCredentials.uid)
        res.send(user)
      } catch (error: any) {
        res.status(500).send(error.code)
      }
      break
    default:
      res.status(404).send('Not found')
  }
}
