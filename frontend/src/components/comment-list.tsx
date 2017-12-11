import * as React from 'react'
import { Comment } from '../api/types'
import { distanceInWordsToNow } from 'date-fns'

interface Props {
  comments: Comment[]
  onDelete: (commentId: number) => any
}

export default function CommentList({ comments, onDelete }: Props) {
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <p>
            <strong>{comment.user.username}</strong>{' '}
            {distanceInWordsToNow(comment.inserted_at, {
              addSuffix: true,
            })}
          </p>
          {comment.body}
          <p>
            <button onClick={() => onDelete(comment.id)}>Delete Comment</button>
          </p>
        </li>
      ))}
    </ul>
  )
}
