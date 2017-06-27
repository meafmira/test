import React, { Component } from 'react'
import routes from './routes'
import { connect } from 'react-redux'
import UserActions from './actions/user'
import localforage from 'localforage'

class App extends Component {
  constructor(props) {
    super(props)
    localforage.getItem('token').then(token => {
      if (token) props.auth(token)
    })
  }

  render() {
    return (
      <div className="App">
        {routes}
      </div>
    )
  }
}

export default connect(({ user }) => ({ user }), UserActions)(App)
