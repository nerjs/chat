import { FC } from 'react'
import styled from 'styled-components/macro'
import { FullSizeFlexUi } from '../flex.ui'

const SkeletonContainer = styled(FullSizeFlexUi)`
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

const ControllSection = styled.div`
  width: 92%;
  background-color: ${({ theme }) => theme.bc.primary};
  height: ${({ theme }) => theme.header.sizes.height}px;
  opacity: 0.5;
  margin: 15px 10px;
  box-shadow: 0 0 5px #fff;
  border-radius: 4px;
`

const SkeletonContentLoading: FC = () => {
  return (
    <SkeletonContainer justifyContent="space-between" alignItems="center">
      <ControllSection />
      <ControllSection />
    </SkeletonContainer>
  )
}

export { SkeletonContentLoading }
