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

export const Action = { SetComments }

export type Action = SetComments

export interface State {
  items: Record<string, Comment>
}

function emptyState(): State {
  return { items: {} }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_COMMENTS':
      const comments: Record<string, Comment> = action.comments.reduce(
        (prev, comment) => ({ ...prev, [comment.id]: comment }),
        {},
      )
      return { ...state, items: comments }
    default:
      return state
  }
}

export default reducer
