import { Conversation } from '../models/conversation.model'

export const conversationService = { query }

const conversations: Conversation[] = [
  {
    id: 'c1',
    members: [
      {
        id: 'u1',
        username: 'John Doe',
        avatar:
          'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      },
      {
        id: 'u2',
        username: 'Mary Jane',
        avatar:
          'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      },
    ],
    messages: [
      {
        id: 'm1',
        content: 'Hello',
        userId: 'u1',
        createdAt: new Date(),
      },
      {
        id: 'm2',
        content: 'Hi there',
        userId: 'u2',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 'c2',
    members: [
      {
        id: 'u3',
        username: 'Bob Rob',
        avatar:
          'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      },
      {
        id: 'u4',
        username: 'Tom Tom',
        avatar:
          'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      },
    ],
    messages: [
      {
        id: 'm3',
        content: 'How are you?',
        userId: 'u4',
        createdAt: new Date(),
      },
      {
        id: 'm4',
        content: "I'm fine, thanks",
        userId: 'u3',
        createdAt: new Date(),
      },
    ],
  },
]

async function query(): Promise<Conversation[]> {
  return new Promise((resolve) => setTimeout(() => resolve(conversations), 500))
}
