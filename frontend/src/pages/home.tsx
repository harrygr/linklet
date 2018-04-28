import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks, vote } from '../store/links/thunks'
import { Link, CreateVote } from '../api/types'
import { values } from 'ramda'
import { Option } from 'catling'

import { LinkList, Card, PaddedCard } from '../components'
import { RouteComponentProps } from 'react-router'
import { LinkButton } from '../components/link'
import styled from 'react-emotion'
import { spacing } from '../styles'

interface StateMappedToProps {
  links: Link[]
  userId: Option<number>
}
interface DispatchMappedToProps {
  fetchLinks: (page: number) => void
  fetchLinksIfRequired: () => void
  onVote: (vote: CreateVote) => any
}

interface Params {
  page?: string
}

interface Props
  extends StateMappedToProps,
    DispatchMappedToProps,
    RouteComponentProps<Params> {}

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchLinks(pageAsNumber(this.props.match.params.page))
  }
  componentWillReceiveProps(nextProps: Props) {
    const nextPage = pageAsNumber(nextProps.match.params.page)
    if (nextPage !== pageAsNumber(this.props.match.params.page)) {
      this.props.fetchLinks(nextPage)
    }
  }

  render() {
    const { links, onVote, userId } = this.props
    const page = parseInt(this.props.match.params.page || '1', 10)

    return (
      <div>
        <Pagination page={page} />
        {links.length > 0 ? (
          <Card>
            <LinkList links={links} onVote={onVote} userId={userId} />
          </Card>
        ) : (
          <PaddedCard>No links to show</PaddedCard>
        )}
        <Pagination page={page} />
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

function pageAsNumber(page?: string): number {
  if (!page) {
    return 1
  }
  return parseInt(page, 10)
}

interface PaginationProps {
  page: number
}

const PaginationCard = styled(Card)`
  padding: ${spacing.cat};
  display: flex;
`

function Pagination({ page }: PaginationProps) {
  return (
    <PaginationCard>
      {page > 1 && (
        <LinkButton to={{ pathname: `/top/${page - 1}` }}>← Prev</LinkButton>
      )}
      <div style={{ flexGrow: 1 }} />
      <LinkButton to={{ pathname: `/top/${page + 1}` }}>Next →</LinkButton>
    </PaginationCard>
  )
}
