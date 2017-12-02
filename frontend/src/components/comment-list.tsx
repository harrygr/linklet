import * as React from 'react'
import { Comment } from '../api/types'
import { distanceInWordsToNow } from 'date-fns'

interface Props {
  comments: Comment[]
}

export default function CommentList({ comments }: Props) {
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
        </li>
      ))}
    </ul>
  )
}
