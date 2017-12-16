import * as React from 'react'
import extractDomain from '../utils/url-parser'
import { Anchor, ListItemHeading } from './'

interface Props {
  title: string
  url: string
}

export function LinkHeading({ title, url }: Props) {
  return (
    <ListItemHeading meta={`(${extractDomain(url)})`}>
      <Anchor href={url} target="_blank">
        {title}
      </Anchor>
    </ListItemHeading>
  )
}

export default LinkHeading
