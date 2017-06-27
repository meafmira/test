import React from 'react'
import Layout from '../layout'
import { connect } from 'react-redux'
import UserActions from '../../actions/user'

class LayoutContainer extends React.Component {
  handleLogout = e => {
    this.props.logout()
    e.preventDefault()
  }

  render() {
    return <Layout onLogout={this.handleLogout} {...this.props} />
  }
}

export default connect(({ user: { user } }) => ({ user }), UserActions)(
  LayoutContainer
)
