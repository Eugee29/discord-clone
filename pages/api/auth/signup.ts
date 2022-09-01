import { NextApiRequest, NextApiResponse } from 'next'
import { authService } from '../services/auth.service'
import { userService } from '../services/user.service'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // Login user
    case 'POST':
      try {
        const { email, password, displayName } = req.body
        const userCredentials = await authService.register(
          email,
          password,
          displayName
        )
        const user = await userService.getUser(userCredentials.user.uid)
        console.log(user)

        res.send(user)
      } catch (error: any) {
        res.status(500).send(error.code)
      }
      break
    default:
      res.status(404).send('Not found')
  }
}
