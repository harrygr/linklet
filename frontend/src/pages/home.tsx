import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks } from '../store/links/thunks'
import { Link } from '../api/types'
import { values } from 'ramda'

import { LinkList, Button, Card } from '../components'

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
        <Card style={{ textAlign: 'center', padding: '10px 0' }}>
          <Button onClick={fetchLinks}>Reload links</Button>
        </Card>
        <Card>
          <LinkList links={links} />
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  const sortKey = state.links.orderedBy
  return {
    links: values(state.links.items).sort(
      (a, b) => (a[sortKey] < b[sortKey] ? 1 : -1),
    ),
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
