import * as React from 'react'
import { distanceInWordsToNow } from 'date-fns'

import { Link as RouterLink } from 'react-router-dom'
import { Link } from '../api/types'

interface Props {
  links: Link[]
}

export default function LinkList({ links }: Props) {
  return (
    <div>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <h4>
              <a href={link.url} target="_blank">
                {link.title}
              </a>{' '}
              <small>({link.url})</small>
            </h4>
            <p>
              By {link.user.username} |{' '}
              {distanceInWordsToNow(link.inserted_at, { addSuffix: true })} |{' '}
              <RouterLink to={`/links/${link.id}`}>
                {link.comments_count} comment{link.comments_count === 1
                  ? ''
                  : 's'}
              </RouterLink>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
