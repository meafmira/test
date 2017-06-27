import React from 'react'
import styled from 'styled-components'
import { host, API_URL } from '../../constants/api'

const FacebookButton = styled.a`
  line-height: 49px;
  height: 49px;
  display: inline-block;
  background-color: #4e6aa5;
	font-size: 17px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	letter-spacing: normal;
	text-align: center;
	color: #ffffff !important;
  text-decoration: none !important;
  padding: 0 70px;
  @media(max-width: 720px) {
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
`

export default props =>
  <FacebookButton
    {...props}
    href={`${API_URL}auth/facebook?callbackUrl=${host}/auth`}
  />
