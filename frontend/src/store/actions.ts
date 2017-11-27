import { Action as UiAction } from './ui/reducer'
import { Action as LinksAction } from './links/reducer'

export type Action = UiAction | LinksAction

const actions = {
  ...UiAction,
  ...LinksAction,
}
export default actions
