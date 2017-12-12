import { Comment } from '../../api/types'

interface SetComments {
  type: 'SET_COMMENTS'
  comments: Comment[]
}

export function SetComments(comments: Comment[]): SetComments {
  return {
    type: 'SET_COMMENTS',
    comments,
  }
}

interface RemoveComment {
  type: 'REMOVE_COMMENT'
  id: number
}

export function RemoveComment(id: number): RemoveComment {
  return { type: 'REMOVE_COMMENT', id }
}

export const Action = { SetComments, RemoveComment }

export type Action = SetComments | RemoveComment

export interface State {
  items: Record<string, Comment>
}

function emptyState(): State {
  return { items: {} }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_COMMENTS': {
      const comments: Record<string, Comment> = action.comments.reduce(
        (prev, comment) => ({ ...prev, [comment.id]: comment }),
        {},
      )
      return { ...state, items: comments }
    }
    case 'REMOVE_COMMENT': {
      const comments: Record<string, Comment> = Object.keys(state.items).reduce(
        (items, id) => {
          return parseInt(id, 10) === action.id
            ? items
            : { ...items, [id]: state.items[id] }
        },
        {},
      )
      return { ...state, items: comments }
    }
    default:
      return state
  }
}

export default reducer
