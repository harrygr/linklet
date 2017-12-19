import * as React from 'react'
import { Comment } from '../api/types'
import { distanceInWordsToNow } from 'date-fns'
import { Option } from 'catling'
import styled from 'react-emotion'

import { List, ListItem, ListItemHeading, DeleteButton } from './'

interface Props {
  comments: Comment[]
  onDelete: (commentId: number) => any
  userId: Option<number>
}

const ContentContainer = styled('div')`
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
          <ContentContainer>{comment.body}</ContentContainer>
          {userId
            .map(
              id =>
                id === comment.user.id ? (
                  <ContentContainer>
                    <DeleteButton onClick={() => onDelete(comment.id)} />
                  </ContentContainer>
                ) : null,
            )
            .get()}
        </ListItem>
      ))}
    </List>
  )
}

export default CommentList
