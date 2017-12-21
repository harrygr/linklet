import * as React from 'react'
import { Icon } from './index'

interface Props {
  className?: string
}

export function ArrowUp({ className }: Props) {
  return (
    <Icon viewBox="0 0 32 32" className={className}>
      <path d="M16 1l-15 15h9v16h12v-16h9z" />
    </Icon>
  )
}
