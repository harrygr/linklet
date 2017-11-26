import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State, Link } from './store'
import { Action, AddLink } from './store/actions'
import LinkAdder from './link-adder'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  links: Link[]
  setLinks: () => void
}

function LinkList({ links, setLinks }: Props) {
  return (
    <div>
      <LinkAdder />
      <ul>
        {links.map((l, i) => (
          <li key={i}>
            <RouterLink to={`/links/${l.id}`}>{l.title}</RouterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps({ links }: State) {
  return { links }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    setLinks: () => dispatch(AddLink('foo' + new Date())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
