import * as React from 'react'
import extractDomain from '../utils/url-parser'
import ListItemHeading from './list-item-heading'
import { Anchor } from './link'

interface Props {
  title: string
  url: string
}

export default function LinkHeading({ title, url }: Props) {
  return (
    <ListItemHeading meta={`(${extractDomain(url)})`}>
      <Anchor href={url} target="_blank">
        {title}
      </Anchor>
    </ListItemHeading>
  )
}
