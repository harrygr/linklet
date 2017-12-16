import * as React from 'react'
import { Comment } from '../api/types'
import { distanceInWordsToNow } from 'date-fns'
import { Option } from 'catling'
import styled from 'react-emotion'

import { List, ListItem, ListItemHeading, Button } from './'

interface Props {
  comments: Comment[]
  onDelete: (commentId: number) => any
  userId: Option<number>
}

const BodyContainer = styled('div')`
  padding-top: 10px;
`

export function CommentList({ comments, onDelete, userId }: Props) {
  return (
    <List>
      {comments.map(comment => (
        <ListItem key={comment.id}>
          <ListItemHeading
            meta={distanceInWordsToNow(comment.inserted_at, {
              addSuffix: true,
            })}
          >
            {comment.user.username}
          </ListItemHeading>
          {userId
            .map(
              id =>
                id === comment.user.id ? (
                  <p>
                    <Button
                      onClick={() => onDelete(comment.id)}
                      style={{ float: 'right' }}
                    >
                      Delete Comment
                    </Button>
                  </p>
                ) : null,
            )
            .get()}
          <BodyContainer>{comment.body}</BodyContainer>
        </ListItem>
      ))}
    </List>
  )
}

export default CommentList
