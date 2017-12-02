import * as React from 'react'
import { Comment } from '../api/types'

interface Props {
  comments: Comment[]
}

export default function CommentList({ comments }: Props) {
  return <ul>{comments.map(Comment)}</ul>
}

function Comment(comment: Comment) {
  return <li>{comment.body}</li>
}
