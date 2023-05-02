import styled from 'styled-components/macro'
import { FullSizeBlock } from './block.ui'

export const BodyLayerUi = styled(FullSizeBlock)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.bc.body};
  z-index: 100;
`
