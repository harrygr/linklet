import * as React from 'react'
import { Comment } from '../api/types'
import { distanceInWordsToNow } from 'date-fns'
import { Option } from 'catling'

interface Props {
  comments: Comment[]
  onDelete: (commentId: number) => any
  userId: Option<number>
}

export default function CommentList({ comments, onDelete, userId }: Props) {
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

          {userId
            .map(
              id =>
                id === comment.user.id ? (
                  <p>
                    <button onClick={() => onDelete(comment.id)}>
                      Delete Comment
                    </button>
                  </p>
                ) : null,
            )
            .get()}
        </li>
      ))}
    </ul>
  )
}
