import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const AuthContainer = styled.div`
  display: inline-block;
`

const AuthShow = ({ token, user, children, show, dispatch, ...props }) => {
  if (
    (show && token !== null && user !== null) ||
    (!show && token === null && user === null)
  )
    return <AuthContainer {...props}>{children}</AuthContainer>
  return null
}

export default connect(({ user }) => ({ token: user.token, user: user.user }))(
  AuthShow
)
