import { UserPreview } from './user-preview.model'

export interface Message {
  id: string
  content: string
  user: UserPreview
  sentAt: EpochTimeStamp
}
