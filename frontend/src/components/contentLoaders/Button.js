import React from 'react'
import styled, { css } from 'styled-components'

import { shimmerKeyframe } from '_contentLoaders'

const Button = styled.div`
  box-sizing: border-box;
  height: 40px;
  width: 150px;
  margin: 0.5rem auto;
  position: relative;
  background: ${PRIMARY_COLOR};
  background: linear-gradient(to right, #FF3E4A 8%, #D00B17 18%, #FF3E4A 33%);
  animation-fill-mode: forwards;
  animation: ${props => css`${shimmerKeyframe('-150px', '150px')}`} 2s linear infinite;
`

export { Button }
