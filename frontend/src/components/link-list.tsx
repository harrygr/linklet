import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Option } from 'catling'
import { colors, spacing } from '../styles'
import { Link, CreateVote } from '../api/types'
import {
  ListItem,
  LinkHeading,
  List,
  LinkMeta,
  ArrowDown,
  ArrowUp,
  ButtonLink,
} from './'

interface Props {
  links: Link[]
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
  color: ${colors.grey};
`

const arrowContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45px;
  width: 17px;
  margin-right: ${spacing.s2};
`

const arrowStyle = (voted: boolean) => css`
  fill: ${voted ? colors.grey : colors.greyLight};
`

export function LinkList({ links, onVote, userId }: Props) {
  return (
    <List>
      {links.map(link => {
        const vote = userId
          .flatMap(id => Option(link.votes.find(v => v.user_id === id)))
          .map(v => v.direction)
          .getOrElse(0)

        const score = link.votes.reduce((sum, v) => sum + v.direction, 0)

        const voteChange = vote === 0 ? 1 : 0

        return (
          <ListItem key={link.id}>
            <div style={{ display: 'flex' }}>
              <ScoreContainer>{score}</ScoreContainer>
              <div className={arrowContainerStyle}>
                <ButtonLink
                  onClick={() =>
                    onVote({
                      direction: voteChange,
                      link_id: link.id,
                    })
                  }
                >
                  <ArrowUp className={arrowStyle(vote === 1)} />
                </ButtonLink>
                <ButtonLink
                  onClick={() =>
                    onVote({
                      direction: -voteChange as -1,
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
          </ListItem>
        )
      })}
    </List>
  )
}

export default LinkList
