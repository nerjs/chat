import styled, { css } from 'styled-components/macro'
import { FullSizeBlock } from './block.ui'
import { Property } from 'csstype'

interface FlexProps {
  alignItems?: Property.AlignItems
  justifyContent?: Property.JustifyContent
  center?: true | 'v' | 'h'
}

const flexCss = css`
  display: flex;
  ${({ alignItems, center }: FlexProps) =>
    alignItems || center === true || center === 'v'
      ? css`
          align-items: ${alignItems || 'center'};
        `
      : ''}
  ${({ justifyContent, center }: FlexProps) =>
    justifyContent || center === true || center === 'h'
      ? css`
          justify-content: ${justifyContent || 'center'};
        `
      : ''}
`

export const FlexUi = styled.div<FlexProps>`
  ${flexCss}
`

export const FullSizeFlexUi = styled(FullSizeBlock)<FlexProps>`
  ${flexCss}
`
