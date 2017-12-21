import { Option, Some } from 'catling'
import { Link, Vote } from '../../api/types'
import { update } from 'ramda'

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

export interface UpdateVote {
  type: 'UPDATE_VOTE'
  linkId: number
  userId: number
  direction: 1 | 0 | -1
}

export function UpdateVote(
  linkId: number,
  userId: number,
  direction: 1 | 0 | -1,
): UpdateVote {
  return { type: 'UPDATE_VOTE', linkId, userId, direction }
}

export const Action = { AddLink, SetLinks, UpdateVote }

export type Action = SetLinks | AddLink | UpdateVote

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
    case 'UPDATE_VOTE': {
      const link = Option(state.items[action.linkId])
      const votes = link.flatMap(link => {
        const voteIndex = link.votes.findIndex(
          v => v.user_id === action.userId && v.link_id === action.linkId,
        )
        if (voteIndex === -1) {
          return Some(
            link.votes.concat({
              link_id: action.linkId,
              user_id: action.userId,
              direction: action.direction,
            }),
          )
        }
        return Option(link.votes[voteIndex])
          .map(v => ({ ...v, direction: action.direction } as Vote))
          .map(newVote => update(voteIndex, newVote, link.votes))
      })

      if (link.isSome() && votes.isSome()) {
        return link
          .map(l => ({ ...l, votes: votes.getOrElse([]) } as Link))
          .map(l => ({ ...state, items: { ...state.items, [l.id]: l } }))
          .getOrElse(state)
      }
      return state
    }
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
