import React from 'react'
import UserActions from '../actions/user'
import { connect } from 'react-redux'

class Auth extends React.Component {
  componentDidMount() {
    const { auth, location: { query: { token } } } = this.props
    auth(token)
    this.props.router.push('/')
  }

  render() {
    return null
  }
}

export default connect(() => ({}), UserActions)(Auth)
