import { Action as UiAction } from './ui/reducer'
import { Action as LinksAction } from './links/reducer'
import { Action as AuthAction } from './auth/reducer'

export type Action = UiAction | LinksAction

const actions = {
  ...UiAction,
  ...LinksAction,
  ...AuthAction,
}
export default actions
