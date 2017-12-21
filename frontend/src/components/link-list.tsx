import * as React from 'react'
import styled from 'react-emotion'
import { colors, spacing } from '../styles'
import { Link, Vote } from '../api/types'
import { ListItem, LinkHeading, List, LinkMeta, Button } from './'

interface Props {
  links: Link[]
  onVote: (vote: Vote) => any
}

const ScoreContainer = styled('div')`
  font-size: 25px;
  width: 45px;
  height: 45px;
  margin-right: ${spacing.s2};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.grey};
`

export function LinkList({ links, onVote }: Props) {
  return (
    <List>
      {links.map(link => (
        <ListItem key={link.id}>
          <div style={{ display: 'flex' }}>
            <ScoreContainer>{link.score}</ScoreContainer>
            <div>
              <LinkHeading url={link.url} title={link.title} />

              <LinkMeta
                username={link.user.username}
                linkDate={link.inserted_at}
                linkId={link.id}
                commentCount={link.comments_count}
              />
              <Button
                onClick={() => onVote({ direction: 1, link_id: link.id })}
              >
                Upvote
              </Button>
              <Button
                onClick={() => onVote({ direction: -1, link_id: link.id })}
              >
                Downvote
              </Button>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  )
}

export default LinkList
