import * as React from 'react'
import { distanceInWordsToNow } from 'date-fns'
import styled from 'react-emotion'

import { Link } from '../api/types'

import { colors, fontSizes } from '../styles'

import { ListItem, LinkHeading, RouterLink, List } from './'

interface Props {
  links: Link[]
}

const LinkMeta = styled('div')`
  color: ${colors.grey};
  font-size: ${fontSizes.small};
  margin-top: 10px;
`

export function LinkList({ links }: Props) {
  return (
    <List>
      {links.map(link => (
        <ListItem key={link.id}>
          <LinkHeading url={link.url} title={link.title} />

          <LinkMeta>
            By {link.user.username} |{' '}
            {distanceInWordsToNow(link.inserted_at, { addSuffix: true })} |{' '}
            <RouterLink to={`/links/${link.id}`} className="">
              {link.comments_count} comment{link.comments_count === 1
                ? ''
                : 's'}
            </RouterLink>
          </LinkMeta>
        </ListItem>
      ))}
    </List>
  )
}

export default LinkList
