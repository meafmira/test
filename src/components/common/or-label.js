import styled from 'styled-components'

export default styled.div`
  font-family: SFText;
  font-size: 18px;
  text-align: center;
  color: #4a4a4a;
  margin: 20px 0;
  text-transform: uppercase;
  display: ${props => (props.block ? 'block' : 'inline-block')}
`
