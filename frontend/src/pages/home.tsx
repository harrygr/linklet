import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { fetchLinksIfNeeded, fetchLinks, vote } from '../store/links/thunks'
import { Link, CreateVote } from '../api/types'
import { values } from 'ramda'
import { Option } from 'catling'
import NotFound from './404'
import { LinkList, Card } from '../components'
import { RouteComponentProps } from 'react-router'
import { LinkButton } from '../components/link'
import styled from 'react-emotion'
import { spacing } from '../styles'

interface StateMappedToProps {
  links: Link[]
  userId: Option<number>
  isLoading: boolean
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
    const { links, onVote, userId, isLoading } = this.props

    if (!isLoading && links.length === 0) {
      return <NotFound />
    }

    const page = parseInt(this.props.match.params.page || '1', 10)
    const showNext = links.length > 9

    return (
      <div>
        <Pagination page={page} showNext={showNext} />

        <Card>
          <LinkList links={links} onVote={onVote} userId={userId} />
        </Card>

        <Pagination page={page} showNext={showNext} />
      </div>
    )
  }
}

function mapStateToProps(state: State): StateMappedToProps {
  const sortKey = state.links.orderedBy
  return {
    links: values(state.links.items).sort(
      (a, b) => (a[sortKey] < b[sortKey] ? 1 : -1),
    ),
    userId: Option(state.auth.user).map(u => u.id),
    isLoading: state.ui.loading,
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
  showNext: boolean
}

const PaginationCard = styled(Card)`
  padding: ${spacing.cat};
  display: flex;
`

function Pagination({ page, showNext }: PaginationProps) {
  return (
    <PaginationCard>
      {page > 1 && (
        <LinkButton to={{ pathname: `/top/${page - 1}` }}>← Prev</LinkButton>
      )}
      <div style={{ flexGrow: 1 }} />
      {showNext && (
        <LinkButton to={{ pathname: `/top/${page + 1}` }}>Next →</LinkButton>
      )}
    </PaginationCard>
  )
}
