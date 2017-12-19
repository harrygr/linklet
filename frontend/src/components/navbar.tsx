import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import { colors, shadow, spacing, animation } from '../styles'
import { Spinner } from './spinner'

const LinkList = styled('ul')`
  margin: 0 auto 0 0;

  padding: 0;
  list-style-type: none;
  display: flex;
`

const linkClass = css`
  padding: 5px 10px;
`

interface Props {
  logout: () => any
  isLoggedIn: boolean
  isLoading: boolean
}

const NavContainer = styled('nav')`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  padding: ${spacing.s1};
  background-color: ${colors.theme};
  box-shadow: ${shadow};
`

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`
const NavButton = styled('button')`
  background: transparent;
  color: #fff;
  cursor: pointer;
`

const iconClass = (visible: boolean) => css`
  fill: #fff;
  opacity: ${visible ? 1 : 0};
  transition: opacity 300ms ease;
  transition-delay: 300ms;
  animation: ${animation.spin} 700ms linear infinite;
`

export function Navbar({ logout, isLoggedIn, isLoading }: Props) {
  return (
    <NavContainer>
      <LinkList>
        <li className={linkClass}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={linkClass}>
          <NavLink to="/links/new">New Link</NavLink>
        </li>
        {isLoggedIn ? (
          <NavButton onClick={logout}>Logout</NavButton>
        ) : (
          [
            <li className={linkClass} key="login">
              <NavLink to="/login">Login</NavLink>
            </li>,
            <li className={linkClass} key="register">
              <NavLink to="/register">Sign Up</NavLink>
            </li>,
          ]
        )}
      </LinkList>

      <Spinner className={iconClass(isLoading)} />
    </NavContainer>
  )
}

export default Navbar
