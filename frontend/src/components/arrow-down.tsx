import * as React from 'react'
import { Icon } from './index'

interface Props {
  className?: string
}

export function ArrowDown({ className }: Props) {
  return (
    <Icon viewBox="0 0 32 32" className={className}>
      <path d="M16 31l15-15h-9v-16h-12v16h-9z" />
    </Icon>
  )
}
