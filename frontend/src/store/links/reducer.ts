import { Link } from '../../api/types'

interface SetLinks {
  type: 'SET_LINKS'
  links: Record<string, Link>
}

export function SetLinks(links: Link[]): SetLinks {
  return {
    type: 'SET_LINKS',
    links: links.reduce((acc, link) => ({ ...acc, [link.id]: link }), {}),
  }
}

interface AddLink {
  type: 'ADD_LINK'
  link: Link
}

export function AddLink(link: Link): AddLink {
  return {
    type: 'ADD_LINK',
    link,
  }
}

export const Action = { AddLink, SetLinks }

export type Action = SetLinks | AddLink

export interface State {
  items: Record<string, Link>
  orderedBy: keyof Link
}

function emptyState(): State {
  return { items: {}, orderedBy: 'inserted_at' }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_LINKS':
      return { ...state, items: action.links }
    case 'ADD_LINK':
      return {
        ...state,
        items: { ...state.items, [action.link.id]: action.link },
      }
    default:
      return state
  }
}

export default reducer
