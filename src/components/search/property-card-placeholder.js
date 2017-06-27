import React from 'react'
import styled, { keyframes } from 'styled-components'

const gradient = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:50% 51%}
  100%{background-position:0% 50%}
`

const Card = styled.div`
  margin-bottom: 60px;
`

const Placeholder = styled.div`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  max-width: 100%;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #eee;
  background: linear-gradient(270deg, #eeeeee, #dddddd);
  background-size: 400% 400%;
  animation: ${gradient} 5s ease infinite;
  top: 0;
  left: 0;
`

const Aspect = styled.div`
  width: ${props => props.width}px;
  max-width: 100%;
  padding-top: ${props => props.height / props.width * 100}%;
  position: relative;
`

const ButtonsContainer = styled.div`
  margin: 14px 0 13px 0;
`

export default function PropertyCardPlaceholder() {
  return (
    <Card>
      <Aspect width={600} height={600}>
        <Placeholder
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
        />
      </Aspect>
      <Placeholder height="30px" style={{ margin: '5px 0 7px 0' }} />
      <ButtonsContainer>
        <div className="row">
          <div className="col text-center">
            <Placeholder height="36px" />
            <Placeholder height="24px" style={{ marginTop: 10 }} />
          </div>
          <div className="col text-center">
            <Placeholder height="36px" />
            <Placeholder height="24px" style={{ marginTop: 10 }} />
          </div>
        </div>
      </ButtonsContainer>
    </Card>
  )
}
