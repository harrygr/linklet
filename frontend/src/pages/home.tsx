import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks, vote } from '../store/links/thunks'
import { Link, Vote } from '../api/types'
import { values } from 'ramda'

import { LinkList, Button, Card } from '../components'

interface StateMappedToProps {
  links: Link[]
}
interface DispatchMappedToProps {
  fetchLinks: () => void
  fetchLinksIfRequired: () => void
  onVote: (vote: Vote) => any
}

interface Props extends StateMappedToProps, DispatchMappedToProps {}

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchLinks()
  }
  render() {
    const { fetchLinks, links, onVote } = this.props
    return (
      <div>
        <Card>
          <LinkList links={links} onVote={onVote} />
        </Card>
        <Card style={{ textAlign: 'center', padding: '10px 0' }}>
          <Button onClick={fetchLinks}>Reload links</Button>
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
    onVote: (payload: Vote) => dispatch(vote(payload)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
