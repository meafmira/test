import styled from 'styled-components'

export default styled.a`
  font-size: 20px;
  background: #fff;
  width: 100%;
  display: block;
  z-index: 100;
  background: ${props => (props.isHighlighted ? '#eee' : '#fff')};
  border-left: solid 1.5px #bbc8dd;
  border-right: solid 1.5px #bbc8dd;
  cursor: pointer;
  color: ${props => (props.isPredef ? '#FF5A5F' : '#000')} !important;
  padding: 0 10px;
  text-align: left;
  &:last-child {
    border-bottom: 1px solid #5cb3fd;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`
