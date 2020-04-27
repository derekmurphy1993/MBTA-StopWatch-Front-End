import React, { Component } from 'react'
import axios from 'axios'
// import { ensureDir } from 'fs-extra'
// import { Link } from 'react-router-dom'
// When you use the ListGroup with the action prop
// You can skip the Link component from react-router
class Favorites extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stillLoading: true,
      favorites: [],
      stations: [],
      predictions: []
    }
  }

  setStateAsync (state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
}

  getDependencies = async () => {
    const { jsonStations } = await axios({
      // this needs to be, like, "currently active in dropdown", whcih ill assume is first
      url: 'http://localhost:4741/stations', // not sure, we'll find out...
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
    await this.setStateAsync({ stations: jsonStations.stations.done() })
    const { jsonFavorites } = await axios({
      url: 'http://localhost:4741/favorites/',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
    await this.setStateAsync({ favorites: jsonFavorites.favorites }).done()
    const { jsonPredictions } = await axios({
      // this needs to be, like, "currently active in dropdown", whcih ill assume is first
      url: `http://localhost:4741/favorites/predictions/${this.state.favorites[0]}`, // not sure, we'll find out...
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
    await this.setStateAsync({ stillLoading: false, predictions: jsonPredictions }).done()
  }

  // // ultimately, this should occur onChange for the dropdown -
  // // doesn't really make sense that they load at init
  // getPredictions = async () => {
  //   const { data } = await axios({
  //     // this needs to be, like, "currently active in dropdown", whcih ill assume is first
  //     url: `http://localhost:4741/favorites/predictions/${this.state.favorites[0]}`, // not sure, we'll find out...
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${this.props.user.token}`
  //     }
  //   })
  //   this.setState({ predictions: data.predictions })
  // }

  // getStations = async () => {
  //   const { data } = await axios({
  //     url: 'http://localhost:4741/stations/', // not sure, we'll find out...
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${this.props.user.token}`
  //     }
  //   })
  //   this.setState({ stations: data.stations })
  // }

  async componentDidMount () {
    await this.getDependencies()
    // Promise.all([this.getFaves(), this.getStations()])
    //   .then(([favorites, stations]) => {
    //     await this.setState({
    //       favorites: favorites,
    //       stations: stations
    //     })
    //   }).all([false, this.getPredictions()])
    //   .then((stillLoading, predictions) => {
    //     this.setState({
    //       stillLoading: stillLoading,
    //       predictions: predictions
    //     })
    //   })
  }

  async componentDidUpdate () {
    // We can check if the component from the previous
    // route sent us some data using the location prop.
    // For convenience, we're destructing the state
    // property from the location object.  For clarity,
    // (so we don't confuse it with the component's state)
    // we're renaming it to locationState when we destructure.
    // const { state: locationState } = this.props.location
    //
    // // Now we check if the locationState is undefined
    // // and if it isn't, check if it has a deleted property.
    // if (locationState && locationState.deleted) {
    //   // Use the book id passed in the deleted property
    //   // to find out of there's actually a book to remove
    //   // from state so that we don't fall into an infinite loop.
    //   const favesToRemove = this.state.favorites.find(favorite => favorite.id === locationState.deleted)
    //   if (favesToRemove) {
    //     // Only run getBooks if the state still contains
    //     // a deleted book.
    //     this.getFaves()
    //   }
    // }
  }

  async injectFavoriteStationsDropdown () {
      // i dont think we need index but easier to take off than put on
    if (!this.state.stillLoading) {
      return null
    }
    console.log(this.state)
    const favoriteStationsDropdown = await this.state.favorites.map((fav, i) => {
      return (
        <option key={i} value={fav.id}>{fav.name}</option>
      )
    })
    return (
      <select value={this.state.value}>
        {await favoriteStationsDropdown}
      </select>
    )
  }

  render () {
    if (this.state.stillLoading) {
      return null

    }
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>My Stops</h2>
        {this.injectFavoriteStationsDropdown()}
      </div>
    )
  }
}

export default Favorites
