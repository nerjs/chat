import styled from 'styled-components'

const getColors = (type: 'error' | 'warn', obj: { warning: string }) => obj.warning

export const AlertUi = styled.div<{ type: 'error' | 'warn'; center?: boolean }>`
  background-color: ${({ type, theme }) => getColors(type, theme.bc)};
  border: 1px solid ${({ type, theme }) => getColors(type, theme.text.color)};
  color: ${({ type, theme }) => getColors(type, theme.text.color)};
  padding: 8px 12px;
  box-shadow: 0 0 3px 1px #fff9;
  border-radius: 5px;
  max-width: 95%;
  max-height: 95%;
  overflow: auto;
  position: relative;
`

export const AlertHeaderUi = styled.h2<{ type: 'error' | 'warn' }>`
  position: sticky;
  top: 0;
  left: 0;
  padding: 5px;
  background-color: ${({ type, theme }) => getColors(type, theme.bc)};
  box-shadow: 0 0 3px #fff6;
  margin-bottom: 10px;
`
