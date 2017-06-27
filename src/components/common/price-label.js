import styled from 'styled-components'

export default styled.div`
  font-family: SFText;
  font-size: 48px;
  color: #4a4a4a;
  margin-bottom: 20px;
  margin-top: ${props => (props.topMargin ? '145px' : '0')};
  @media(max-width: 720px) {
    margin-top: 20px;
  }
`
