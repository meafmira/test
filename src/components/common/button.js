import styled from 'styled-components'
import { Link } from 'react-router'

export default styled(Link)`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  height: 36px;
	border-radius: 4px;
	background-color: ${props => (props.primary ? '#466fa0' : '#9b9b9b')};
	box-shadow: ${props =>
    props.primary
      ? '0 3px 4px 0 rgba(24, 59, 105, 0.5), 0 4px 0 0 #2f5484'
      : '0 3px 4px 0 #9b9b9b, 0 4px 0 0 #706f70'};
	font-family: "SFText";
	font-size: 14px;
	font-weight: bold;
	font-style: normal;
	font-stretch: normal;
	line-height: 36px;
	letter-spacing: normal;
	text-align: center;
	color: #ffffff !important;
  text-decoration: none !important;
  text-transform: uppercase;
  padding: 0 10px;
  margin-left: ${props => (props.leftMargin ? '10px' : 0)};
  vertical-align: baseline;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    text-decoration: none;
    background-color: ${props => (props.primary ? '#517db1' : '#b7b7b7')};
	  box-shadow: ${props =>
      props.primary
        ? '0 3px 4px 0 rgba(24, 59, 105, 0.5), 0 4px 0 0 #2f5484'
        : '0 3px 4px 0 #9b9b9b, 0 4px 0 0 #706f70'};
  },
  &:active {
    box-shadow: none;
    color: #ffffff;
    text-decoration: none;
	  background-color: ${props => (props.primary ? '#466fa0' : '#9b9b9b')};
  }
  @media(max-width: 720px) {
    & {
      display: ${props => (props.inline ? 'inline-block' : 'block')};
      margin-top: 10px;
    }
  }
`
