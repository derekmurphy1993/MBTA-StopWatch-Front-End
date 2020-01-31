import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'

import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

import Favorites from './components/Stops/Favorites'
import FavesCreate from './components/Stops/FavoritesCreate'
import Favorite from './components/Stops/Favorite'
import FavesEdit from './components/Stops/FavesEdit'
// autoload favorites on log in

// const loggedInBody = ({ user }) => (
//   <Fragment>
//     <AuthenticatedRoute user={user} exact path="/favorites" render={() => (
//       <Favorites alert={this.alert} user={user} />
//     )} />
//   </Fragment>
// )
//
// const loggedOutBody = (
//   <Fragment>
//     { 'Welcome! Create an account to begin!' }
//   </Fragment>
// )
//
// const Welcome = ({ user }) => (
//   <Fragment>
//     { user ? loggedInBody : loggedOutBody }
//   </Fragment>
// )

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">

          <AuthenticatedRoute user={user} exact path='/favorites/:id' render={(props) => (
            <Favorite user={user} match={props.match} history={props.history} alert={this.alert} />
          )} />

          <AuthenticatedRoute user={user} exact path="/favorites" render={() => (
            <Favorites alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/create-Favorite' render={() => (
            <FavesCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/favorites/:id/edit' render={({ match }) => (
            <FavesEdit alert={this.alert} user={user} match={match} />
          )} />

          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>

    )
  }
}

export default App
