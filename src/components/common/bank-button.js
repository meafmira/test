import React from 'react'
import styled from 'styled-components'

const BankLink = styled.a`
  border-radius: 4px;
  cursor: pointer;
  border: solid 1px #517db1;
	height: 36px;
	font-family: .SFNSText;
	font-size: 14px;
	font-weight: bold;
	font-style: normal;
	font-stretch: normal;
	line-height: 34px;
	letter-spacing: normal;
	text-align: center;
	color: ${props =>
    props.checked ? '#ffffff !important' : '#333333 !important'};
  padding: 0 20px;
  display: inline-block;
  text-decoration: none !important;
  margin-right: 16px;
  background-color: ${props => (props.checked ? '#466fa0' : 'transparent')};
  &:hover {
  	background-color: #466fa0;
    color: #ffffff !important;
  }
`

export default function BankButton({ checked, children, ...props }) {
  return (
    <BankLink {...props} checked={checked}>
      {checked ? <img alt="checkbox" src="/images/checked.png" /> : null}{' '}
      {children}
    </BankLink>
  )
}
