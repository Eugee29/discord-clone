import { UserPreview } from './user-preview.model'

export interface ConversationPreviewModel {
  id: string
  members: UserPreview[]
}
