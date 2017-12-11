import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { State } from '../../store'
import { RouteComponentProps } from 'react-router'
import NotFound from '../404'
import { Link, Comment } from '../../api/types'

import { fetchLinksIfNeeded } from '../../store/links/thunks'
import { fetchComments, deleteComment } from '../../store/comments/thunks'
import { values } from 'lodash'
import CommentList from '../../components/comment-list'

interface Params {
  id: string
}

interface StateMappedToProps {
  links: Record<string, Link>
  comments: Record<string, Comment>
  loading: boolean
}
interface DispatchMappedToProps {
  fetchLinksIfNeeded: () => void
  fetchComments: (linkId: string) => void
  deleteComment: (linkId: string, commentId: string) => void
}

interface Props
  extends StateMappedToProps,
    DispatchMappedToProps,
    RouteComponentProps<Params> {}

export class ShowLink extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchLinksIfNeeded()
    this.props.fetchComments(this.props.match.params.id)
  }

  render() {
    if (this.props.loading) {
      return <div />
    }

    const link = this.props.links[this.props.match.params.id]
    if (!link) {
      return NotFound()
    }

    const onDeleteComment = (commentId: number) => {
      this.props.deleteComment(link.id.toString(), commentId.toString())
    }

    return (
      <div>
        <h2>
          <a href={link.url} target="_blank">
            {link.title}
          </a>
        </h2>
        <p>{link.url}</p>
        <h3>Comments</h3>
        <CommentList
          comments={values(this.props.comments)}
          onDelete={onDeleteComment}
        />
      </div>
    )
  }
}
function mapStateToProps({ links, ui, comments }: State) {
  return {
    links: links.items,
    comments: comments.items,
    loading: ui.loading,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    fetchLinksIfNeeded: () => dispatch(fetchLinksIfNeeded()),
    fetchComments: (linkId: string) => dispatch(fetchComments(linkId)),
    deleteComment: (linkId: string, commentId: string) =>
      dispatch(deleteComment(linkId, commentId)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLink)
