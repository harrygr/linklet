import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'react-emotion'

const LinkList = styled('ul')`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
`

const linkClass = css`
  padding: 5px 10px;
`

interface Props {
  logout: () => any
}

export default function Navbar({ logout }: Props) {
  return (
    <nav>
      <LinkList>
        <li className={linkClass}>
          <Link to="/">Home</Link>
        </li>
        <li className={linkClass}>
          <Link to="/links/new">New Link</Link>
        </li>
        <li className={linkClass}>
          <Link to="/login">Login</Link>
        </li>
        <button onClick={logout}>Logout</button>
      </LinkList>
    </nav>
  )
}
