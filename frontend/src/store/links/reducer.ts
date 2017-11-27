import { Link } from '../../api/links'

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

export function AddLink(title: string): AddLink {
  const link: Link = {
    id: new Date().valueOf(),
    title,
    url: '',
    updated_at: new Date().toISOString(),
    inserted_at: new Date().toISOString(),
  }

  return {
    type: 'ADD_LINK',
    link,
  }
}

export const Action = { AddLink, SetLinks }

export type Action = SetLinks | AddLink

export interface State {
  items: Record<string, Link>
}

function emptyState(): State {
  return { items: {} }
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
