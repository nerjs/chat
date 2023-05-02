import styled, { css } from 'styled-components/macro'

export const FullScreenBlock = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
`

export const FullHeightBlock = styled.div`
  height: 100%;
  max-height: 100%;
  min-height: 100%;
`

export const FullSizeBlock = styled(FullHeightBlock)<{ min?: boolean }>`
  width: 100%;
  max-width: 100%;
  ${({ min }) =>
    min
      ? css`
          min-width: 100%;
        `
      : ''}
`

export const MainWrapperUi = styled(FullScreenBlock)`
  overflow: hidden;
  position: relative;
`
