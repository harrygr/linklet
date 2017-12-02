import * as React from 'react'

interface Props {
  loading: boolean
}

export default function Loader({ loading }: Props) {
  return loading ? <div>Loading...</div> : null
}
