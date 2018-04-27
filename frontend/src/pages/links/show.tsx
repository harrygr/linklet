import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Option } from 'catling'

import { State } from '../../store'
import { RouteComponentProps } from 'react-router'
import NotFound from '../404'
import { Link, Comment, CreateVote } from '../../api/types'
import { values, isEmpty } from 'ramda'
import { SubmitHandler, reduxForm, Field } from 'redux-form'
import { fetchLinkIfNeeded, vote } from '../../store/links/thunks'
import {
  fetchComments,
  deleteComment,
  postComment,
} from '../../store/comments/thunks'
import {
  Card,
  CardSection,
  PaddedCard,
  Button,
  CommentList,
  FormInput,
  SectionHeading,
  LinkItem,
} from '../../components'

interface FormProps {
  handleSubmit: SubmitHandler<Fields, {}>
}

interface Fields {
  body: string
}

const CommentForm = reduxForm<Fields>({
  form: 'comment',
})((props: FormProps) => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} name="body" label="Comment" type="text" />

      <Button type="submit">Post Comment</Button>
    </form>
  )
})

interface Params {
  id: string
}

interface StateMappedToProps {
  links: Record<string, Link>
  comments: Record<string, Comment>
  loading: boolean
  userId: Option<number>
}
interface DispatchMappedToProps {
  fetchLinkIfNeeded: (linkId: string) => void
  fetchComments: (linkId: string) => void
  postComment: (linkId: string) => (fields: Fields) => any
  deleteComment: (linkId: string, commentId: string) => void
  onVote: (vote: CreateVote) => any
}

interface Props
  extends StateMappedToProps,
    DispatchMappedToProps,
    RouteComponentProps<Params> {}

export class ShowLink extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchLinkIfNeeded(this.props.match.params.id)
    this.props.fetchComments(this.props.match.params.id)
  }

  render() {
    const link = this.props.links[this.props.match.params.id]

    if (!link) {
      return !this.props.loading && NotFound()
    }

    const onDeleteComment = (commentId: number) => {
      this.props.deleteComment(link.id.toString(), commentId.toString())
    }

    const onPostComment = this.props.postComment(link.id.toString())
    const comments = values(this.props.comments)
    return (
      <div>
        <PaddedCard>
          <LinkItem
            link={link}
            onVote={this.props.onVote}
            userId={this.props.userId}
          />
        </PaddedCard>

        <Card>
          <CardSection>
            <SectionHeading>Comments</SectionHeading>
          </CardSection>

          <CommentList
            comments={comments}
            onDelete={onDeleteComment}
            userId={this.props.userId}
          />
          {!this.props.loading &&
            isEmpty(comments) && <CardSection>None yet</CardSection>}
        </Card>

        {this.props.userId
          .map(() => (
            <PaddedCard>
              <CommentForm onSubmit={onPostComment} />
            </PaddedCard>
          ))
          .get()}
      </div>
    )
  }
}
function mapStateToProps({ links, ui, comments, auth }: State) {
  return {
    links: links.items,
    comments: comments.items,
    loading: ui.loading,
    userId: Option(auth.user).map(u => u.id),
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    fetchLinkIfNeeded: (linkId: string) => dispatch(fetchLinkIfNeeded(linkId)),
    fetchComments: (linkId: string) => dispatch(fetchComments(linkId)),
    deleteComment: (linkId: string, commentId: string) =>
      dispatch(deleteComment(linkId, commentId)),
    postComment: (linkId: string) => (fields: Fields) =>
      dispatch(postComment(linkId, fields.body)),
    onVote: (payload: CreateVote) => dispatch(vote(payload)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLink)
