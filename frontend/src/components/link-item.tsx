import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Option } from 'catling'
import { colors, spacing } from '../styles'
import { Link, CreateVote } from '../api/types'
import { LinkHeading, LinkMeta, ArrowDown, ArrowUp, ButtonLink } from './'

interface Props {
  link: Link
  onVote: (vote: CreateVote) => any
  userId: Option<number>
}

const ScoreContainer = styled('div')`
  font-size: 25px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.grey3};
`

const arrowContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45px;
  width: 17px;
  margin-right: ${spacing.cat};
`

const arrowStyle = (voted: boolean) => css`
  fill: ${voted ? colors.grey3 : colors.grey7};
`

export function LinkItem({ link, onVote, userId }: Props) {
  const vote = userId
    .flatMap(id => Option(link.votes.find(v => v.user_id === id)))
    .map(v => v.direction)
    .getOrElse(0)

  const score = link.votes.reduce((sum, v) => sum + v.direction, 0)

  const upvoteChange = vote === 1 ? 0 : 1
  const downvoteChange = vote === -1 ? 0 : -1

  return (
    <div style={{ display: 'flex' }}>
      <ScoreContainer>{score}</ScoreContainer>
      <div className={arrowContainerStyle}>
        <ButtonLink
          onClick={() =>
            onVote({
              direction: upvoteChange,
              link_id: link.id,
            })
          }
        >
          <ArrowUp className={arrowStyle(vote === 1)} />
        </ButtonLink>
        <ButtonLink
          onClick={() =>
            onVote({
              direction: downvoteChange,
              link_id: link.id,
            })
          }
        >
          <ArrowDown className={arrowStyle(vote === -1)} />
        </ButtonLink>
      </div>
      <div>
        <LinkHeading url={link.url} title={link.title} />
        <LinkMeta
          username={link.user.username}
          linkDate={link.inserted_at}
          linkId={link.id}
          commentCount={link.comments_count}
        />
      </div>
    </div>
  )
}

export default LinkItem
