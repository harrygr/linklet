import * as React from 'react'
import styled, { css } from 'react-emotion'
import { colors, spacing } from '../styles'
import { Link, Vote } from '../api/types'
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
  onVote: (vote: Vote) => any
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

const arrowStyle = css`
  fill: ${colors.grey};
`

export function LinkList({ links, onVote }: Props) {
  return (
    <List>
      {links.map(link => (
        <ListItem key={link.id}>
          <div style={{ display: 'flex' }}>
            <ScoreContainer>{link.score}</ScoreContainer>
            <div className={arrowContainerStyle}>
              <ButtonLink
                onClick={() =>
                  onVote({
                    direction: 1,
                    link_id: link.id,
                  })
                }
              >
                <ArrowUp className={arrowStyle} />
              </ButtonLink>
              <ButtonLink
                onClick={() =>
                  onVote({
                    direction: -1,
                    link_id: link.id,
                  })
                }
              >
                <ArrowDown className={arrowStyle} />
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
      ))}
    </List>
  )
}

export default LinkList
