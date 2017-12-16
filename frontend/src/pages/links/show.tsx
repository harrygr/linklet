import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Option } from 'catling'
import styled from 'react-emotion'

import { State } from '../../store'
import { RouteComponentProps } from 'react-router'
import NotFound from '../404'
import { Link, Comment } from '../../api/types'
import { values } from 'ramda'
import { SubmitHandler, reduxForm } from 'redux-form'
import { fetchLinksIfNeeded } from '../../store/links/thunks'
import {
  fetchComments,
  deleteComment,
  postComment,
} from '../../store/comments/thunks'

import CommentList from '../../components/comment-list'
import { getUserIdFromToken } from '../../utils/auth'
import Card from '../../components/card'
import PaddedCard from '../../components/padded-card'
import LinkHeading from '../../components/link-heading'
import Button from '../../components/button'
import FormInput from '../../components/form-input'
import Label from '../../components/label'
import SectionHeading from '../../components/section-heading'
import { spacing } from '../../styles'

const Heading = styled(LinkHeading)`
  font-size: 150%;
`

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
      <div>
        <Label htmlFor="body">Comment</Label>
        <FormInput name="body" component="textarea" type="text" rows={1} />
      </div>
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
  fetchLinksIfNeeded: () => void
  fetchComments: (linkId: string) => void
  postComment: (linkId: string) => (fields: Fields) => any
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
    const link = this.props.links[this.props.match.params.id]

    if (!link) {
      return NotFound()
    }

    const onDeleteComment = (commentId: number) => {
      this.props.deleteComment(link.id.toString(), commentId.toString())
    }

    const onPostComment = this.props.postComment(link.id.toString())

    return (
      <div>
        <PaddedCard>
          <Heading url={link.url} title={link.title} />
        </PaddedCard>

        <Card>
          <div style={{ padding: spacing.s2 }}>
            <SectionHeading>Comments</SectionHeading>
          </div>

          <CommentList
            comments={values(this.props.comments)}
            onDelete={onDeleteComment}
            userId={this.props.userId}
          />
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
    userId: getUserIdFromToken(auth.token),
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    fetchLinksIfNeeded: () => dispatch(fetchLinksIfNeeded()),
    fetchComments: (linkId: string) => dispatch(fetchComments(linkId)),
    deleteComment: (linkId: string, commentId: string) =>
      dispatch(deleteComment(linkId, commentId)),
    postComment: (linkId: string) => (fields: Fields) =>
      dispatch(postComment(linkId, fields.body)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLink)
