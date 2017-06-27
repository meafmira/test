import React from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import Layout from './components/containers/layout'
import Home from './components/home'
import Search from './components/containers/search'
import Property from './components/containers/property'
import Auth from './components/auth'

const scroll = () => window.scrollTo(0, 0)

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="search" component={Search} />
      <Route
        onEnter={scroll}
        path="properties/:propertyId"
        component={Property}
      />
    </Route>
    <Route path="/auth" component={Auth} />
  </Router>
)
