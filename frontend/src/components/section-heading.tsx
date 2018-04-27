import styled from 'react-emotion'

import { fontSizes, colors, spacing } from '../styles'

export const SectionHeading = styled('h2')`
  font-size: ${fontSizes.largish};
  font-weight: normal;
  margin: 0;
  padding-bottom: ${spacing.mouse};
  border-bottom: 1px solid ${colors.grey7};
`

export default SectionHeading
