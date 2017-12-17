import { Action as UiAction } from './ui/reducer'
import { Action as LinksAction } from './links/reducer'
import { Action as AuthAction } from './auth/reducer'
import { Action as CommentAction } from './comments/reducer'
import { register } from './users/reducer'

export type Action = UiAction | LinksAction | CommentAction

const actions = {
  ...UiAction,
  ...LinksAction,
  ...AuthAction,
  ...CommentAction,
  register,
}
export default actions
