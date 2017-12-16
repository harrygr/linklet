import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  children: React.ReactNode
  meta: string
}

const Heading = styled('h4')`
  margin: 0;
  font-weight: normal;
`

const MetaContainer = styled('span')`
  font-size: 12px;
  color: #828282;
`

export default function LinkHeading({ children, meta }: Props) {
  return (
    <Heading>
      {children} <MetaContainer>{meta}</MetaContainer>
    </Heading>
  )
}
