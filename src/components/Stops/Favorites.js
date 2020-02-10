import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { Link } from 'react-router-dom'
// When you use the ListGroup with the action prop
// You can skip the Link component from react-router
import ListGroup from 'react-bootstrap/ListGroup'

class Favorites extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorites: []
    }
  }

  componentDidMount () {
    this.getFaves()
  }

  componentDidUpdate () {
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

  getFaves = () => {
    axios({
      url: `${apiUrl}/favorites/`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ favorites: response.data.favorites.reverse() })
      })
      .catch(console.error)
  }

  render () {
    let favesJsx = ''

    if (!this.state.favorites.length) {
      favesJsx = <p>Loading...</p>
    } else {
      favesJsx = this.state.favorites.map(favorite => (
        <ListGroup.Item
          key={favorite.id}
          action
          href={`#/favorites/${favorite.id}`}
          className="d-flex justify-content-between"
        >
          <span>{favorite.description}</span>
          <span>{favorite.station.name}</span>
          <span>{favorite.station.url_path}</span>
        </ListGroup.Item>

      ))
    }

    // If you used just an li element above be sure to
    // substitute a ul element for the ListGroup below:
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>My Stops</h2>
        <ListGroup>
          {favesJsx}
        </ListGroup>
      </div>
    )
  }
}

export default Favorites
