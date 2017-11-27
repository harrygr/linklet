import { Link } from '../api/links'
import TestActions, { TestAction } from './test-actions'
import { AlertLevel } from './index'

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

interface SetAlert {
  type: 'SET_ALERT'
  alert: string
  level: AlertLevel
}

export function SetAlert(
  alert: string,
  level: AlertLevel = 'danger',
): SetAlert {
  return { type: 'SET_ALERT', alert, level }
}

interface SetLoading {
  type: 'SET_LOADING'
  loading: boolean
}

export function SetLoading(loading: boolean): SetLoading {
  return { type: 'SET_LOADING', loading }
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

export default {
  SetLink,
  SetLinks,
  SetAlert,
  SetLoading,
  AddLink,
  ...TestActions,
}

export type Action =
  | SetAlert
  | SetLoading
  | SetLinks
  | AddLink
  | SetLink
  | TestAction
