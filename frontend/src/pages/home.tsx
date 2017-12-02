import * as React from 'react'
import LinkList from '../link-list'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks } from '../store/links/thunks'

interface StateMappedToProps {}
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
    const { fetchLinks } = this.props
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome</p>
        <button onClick={fetchLinks}>Load links</button>
        <LinkList />
      </div>
    )
  }
}

function mapStateToProps(s: State) {
  return {}
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
