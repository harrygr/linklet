import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks, vote } from '../store/links/thunks'
import { Link, CreateVote } from '../api/types'
import { values } from 'ramda'
import { Option } from 'catling'

import { LinkList, Button, Card } from '../components'

interface StateMappedToProps {
  links: Link[]
  userId: Option<number>
}
interface DispatchMappedToProps {
  fetchLinks: () => void
  fetchLinksIfRequired: () => void
  onVote: (vote: CreateVote) => any
}

interface Props extends StateMappedToProps, DispatchMappedToProps {}

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchLinks()
  }
  render() {
    const { fetchLinks, links, onVote, userId } = this.props
    return (
      <div>
        <Card>
          <LinkList links={links} onVote={onVote} userId={userId} />
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
    userId: Option(state.auth.user).map(u => u.id),
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    fetchLinks: () => dispatch(fetchLinks()),
    fetchLinksIfRequired: () => dispatch(fetchLinksIfNeeded()),
    onVote: (payload: CreateVote) => dispatch(vote(payload)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
