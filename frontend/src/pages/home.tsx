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
  fetchLinks: (page: number) => void
  fetchLinksIfRequired: () => void
  onVote: (vote: CreateVote) => any
}

interface Props extends StateMappedToProps, DispatchMappedToProps {}
interface HomeState extends StateMappedToProps {
  page: number
}

export class Home extends React.Component<Props, HomeState> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.setState({ page: 1 }, () => {
      this.props.fetchLinks(this.state.page)
    })
  }

  render() {
    const { fetchLinks, links, onVote, userId } = this.props

    const getPageOffset = (offset: number) => {
      const newPage = this.state.page + offset
      fetchLinks(newPage)
      this.setState({ page: newPage })
    }
    return (
      <div>
        <Card>
          <LinkList links={links} onVote={onVote} userId={userId} />
        </Card>
        <Card style={{ textAlign: 'center', padding: '10px 0' }}>
          <Button onClick={() => getPageOffset(-1)}>← Prev</Button>

          <Button onClick={() => getPageOffset(1)}>Next →</Button>
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
    fetchLinks: (page: number) => dispatch(fetchLinks(page)),
    fetchLinksIfRequired: () => dispatch(fetchLinksIfNeeded()),
    onVote: (payload: CreateVote) => dispatch(vote(payload)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
