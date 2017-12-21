import * as React from 'react'
import { Option } from 'catling'
import { Link, CreateVote } from '../api/types'
import { LinkItem, List, ListItem } from './'

interface Props {
  links: Link[]
  onVote: (vote: CreateVote) => any
  userId: Option<number>
}

export function LinkList({ links, onVote, userId }: Props) {
  return (
    <List>
      {links.map((link, i) => (
        <ListItem key={link.id}>
          <LinkItem key={i} link={link} onVote={onVote} userId={userId} />
        </ListItem>
      ))}
    </List>
  )
}

export default LinkList
