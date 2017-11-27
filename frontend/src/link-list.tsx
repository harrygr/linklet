import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from './store'
import actions, { Action } from './store/actions'
import LinkAdder from './link-adder'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from './api/links'

interface Props {
  links: Record<string, Link>
  setLinks: () => void
}

function LinkList({ links, setLinks }: Props) {
  return (
    <div>
      <LinkAdder />
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    setLinks: () => dispatch(actions.AddLink('foo' + new Date())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
