import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { State } from '../../store'
import { RouteComponentProps } from 'react-router'
import NotFound from '../404'
import { Link } from '../../api/links'
import { fetchLinks } from '../../store/effects'
import { Action } from '../../store/actions'

interface Params {
  id: string
}

interface StateMappedToProps {
  links: Record<string, Link>
  loading: boolean
}
interface DispatchMappedToProps {
  loadLinks: () => void
}

interface Props
  extends StateMappedToProps,
    DispatchMappedToProps,
    RouteComponentProps<Params> {}

export class ShowLink extends React.Component<Props> {
  componentDidMount() {
    this.props.loadLinks()
  }

  render() {
    if (this.props.loading) {
      return <div />
    }

    const link = this.props.links[this.props.match.params.id]
    if (!link) {
      return NotFound()
    }

    return (
      <div>
        <h1>Link</h1>
        <p>This is the link: {link.title}</p>
      </div>
    )
  }
}
function mapStateToProps({ links, ui }: State) {
  return { links: links.items, loading: ui.loading }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    loadLinks: () => dispatch(fetchLinks()),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLink)
