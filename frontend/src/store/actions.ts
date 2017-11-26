import { Link } from './index'

interface SetLinks {
  type: 'SET_LINKS'
  links: Link[]
}

export function SetLinks(links: Link[]): SetLinks {
  return {
    type: 'SET_LINKS',
    links,
  }
}

interface SetLink {
  type: 'SET_LINK'
  linkId: string
}

export function SetLink(linkId: string): SetLink {
  return {
    type: 'SET_LINK',
    linkId,
  }
}

interface AddLink {
  type: 'ADD_LINK'
  link: Link
}

export function AddLink(title: string): AddLink {
  return {
    type: 'ADD_LINK',
    link: { id: `${new Date().valueOf()}`, title },
  }
}

export type Action = SetLinks | AddLink | SetLink
