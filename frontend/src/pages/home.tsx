import * as React from 'react'
import LinkList from '../components/link-list'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks } from '../store/links/thunks'
import { Link } from '../api/types'
import { values } from 'lodash'

interface StateMappedToProps {
  links: Link[]
}
interface DispatchMappedToProps {
  fetchLinks: () => void
  fetchLinksIfRequired: () => void
}

interface Props extends StateMappedToProps, DispatchMappedToProps {}

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchLinksIfRequired()
  }
  render() {
    const { fetchLinks, links } = this.props
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome</p>
        <button onClick={fetchLinks}>Load links</button>
        <LinkList links={links} />
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    links: values(state.links.items),
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    fetchLinks: () => dispatch(fetchLinks()),
    fetchLinksIfRequired: () => dispatch(fetchLinksIfNeeded()),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
