import * as React from 'react'
import { distanceInWordsToNow } from 'date-fns'
import styled from 'react-emotion'

import { colors, fontSizes } from '../styles'

import { RouterLink } from './'

interface Props {
  username: string
  linkId: number
  linkDate: string
  commentCount: number
}

const LinkMetaContainer = styled('div')`
  color: ${colors.grey3};
  font-size: ${fontSizes.small};
  margin-top: 10px;
`
export function LinkMeta({ username, linkDate, commentCount, linkId }: Props) {
  return (
    <LinkMetaContainer>
      By {username} | {distanceInWordsToNow(linkDate, { addSuffix: true })} |{' '}
      <RouterLink to={`/links/${linkId}`}>
        {commentCount} comment{commentCount === 1 ? '' : 's'}
      </RouterLink>
    </LinkMetaContainer>
  )
}
export default LinkMetaContainer
