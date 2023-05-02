import styled, { keyframes } from 'styled-components/macro'
import { BodyLayerUi } from '../layer.ui'
import { Spinrilla } from '@styled-icons/simple-icons/Spinrilla'
import { FullScreenBlock } from '../block.ui'

const show = keyframes`
  0% {
    opacity: 0;
  }


  70% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
`

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }

  10% {
    transform: translate(-50%, -50%) rotate(${360 * 2}deg) scale(1.4);
  }

  30% {
    transform: translate(-50%, -50%) rotate(${360 * 3.5}deg) scale(1);
  }


  50% {
    transform: translate(-50%, -50%) rotate(${360 * 4.5}deg) scale(1.6);
  }


  60% {
    transform: translate(-50%, -50%) rotate(${360 * 6.5}deg) scale(1);
  }

  80% {
    transform: translate(-50%, -50%) rotate(${360 * 7.5}deg) scale(1.2);
  }


  100% {
    transform: translate(-50%, -50%) rotate(${360 * 9}deg) scale(1);
  }
`

const LoadingContainer = styled(FullScreenBlock)`
  overflow: hidden;
  position: relative;
  z-index: 10000;
  animation: ${show} 3s linear 0s 1;
`

const Spinner = styled(Spinrilla)`
  z-index: 101;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10vw;
  height: 10vh;
  fill: ${({ theme }) => theme.text.color.primary};
  animation: ${spin} 15s linear infinite;
`

const ScreenLoading = () => (
  <LoadingContainer>
    <BodyLayerUi />
    <Spinner />
  </LoadingContainer>
)

export { ScreenLoading }
