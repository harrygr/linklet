import * as React from 'react'
import LinkList from '../link-list'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded } from '../store/effects'

interface StateMappedToProps {}
interface DispatchMappedToProps {
  loadLinks: () => void
}

interface Props extends StateMappedToProps, DispatchMappedToProps {}

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.loadLinks()
  }
  render() {
    const { loadLinks } = this.props
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome</p>
        <button onClick={loadLinks}>Load links</button>
        <LinkList />
      </div>
    )
  }
}

function mapStateToProps(s: State) {
  return {}
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return { loadLinks: () => dispatch(fetchLinksIfNeeded()) }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
