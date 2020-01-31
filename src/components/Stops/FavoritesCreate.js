import React, { Component } from 'react'
import FavesForm from './FavesForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class FavesCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: {
        description: '',
        user_id: `${props.user.id}`,
        station_id: ''
      },
      createdId: ''
    }
  }

  handleChange = event => {
    this.setState({
      favorite: {
        ...this.state.favorite,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/favorites`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        favorite: this.state.favorite
      }
    })
      .then(res => this.setState({ createdId: res.data.favorite.id }))
      .then(() => this.props.alert({
        heading: 'Stop added to watchlist!',
        message: 'Find your favorite stops on the home page.',
        variant: 'success'
      }))
      .catch(() => this.props.alert({
        heading: 'Something went wrong',
        message: 'Try again!',
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to={`/favorites/${this.state.createdId}`} />
    }

    return (
      <FavesForm
        favorite={this.state.favorite}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default FavesCreate
