import styled from 'styled-components'

export default styled.input`
  width: 210px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #5a87be;
  padding: 0 10px;
  @media(max-width: 720px) {
    & {
      width: 100%;
    }
  }
`
