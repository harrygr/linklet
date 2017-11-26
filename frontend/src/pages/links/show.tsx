import * as React from 'react'
import { connect } from 'react-redux'

import { State, Link } from '../../store'
import { RouteComponentProps } from 'react-router'
import NotFound from '../404'

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {
  links: Link[]
}

export function ShowLink({ match, links }: Props) {
  const link = links.find(l => l.id === match.params.id)
  if (!link) {
    return NotFound()
  }

  return (
    <div>
      <h1>Link</h1>
      <p>This is the link: {link.id}</p>
    </div>
  )
}

function mapStateToProps({ links }: State) {
  return { links }
}

export default connect(mapStateToProps)(ShowLink)
