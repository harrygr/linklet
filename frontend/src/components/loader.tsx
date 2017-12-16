import * as React from 'react'

interface Props {
  loading: boolean
}

export function Loader({ loading }: Props) {
  return loading ? <div>Loading...</div> : null
}

export default Loader
