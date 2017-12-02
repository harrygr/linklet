import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from './store'

import { Link as RouterLink } from 'react-router-dom'
import { Link } from './api/types'

interface Props {
  links: Record<string, Link>
}

function LinkList({ links }: Props) {
  return (
    <div>
      <ul>
        {Object.keys(links).map(id => (
          <li key={id}>
            <RouterLink to={`/links/${id}`}>{links[id].title}</RouterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps({ links }: State) {
  return { links: links.items }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
