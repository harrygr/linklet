import * as React from 'react'
import { Link } from '../api/types'
import { ListItem, LinkHeading, List, LinkMeta } from './'

interface Props {
  links: Link[]
}

export function LinkList({ links }: Props) {
  return (
    <List>
      {links.map(link => (
        <ListItem key={link.id}>
          <LinkHeading url={link.url} title={link.title} />

          <LinkMeta
            username={link.user.username}
            linkDate={link.inserted_at}
            linkId={link.id}
            commentCount={link.comments_count}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default LinkList
