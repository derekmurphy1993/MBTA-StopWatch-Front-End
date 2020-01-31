import React, { Component } from 'react'
import FavesForm from './FavesForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class FavesEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: {
        description: '',
        station_id: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/favorites/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => {
        const favorite = {
          // into this new object
          ...res.data.favorite,
          // Override the firstPublished property with
          // a new one containing a formatted date that works with
          // the input field by taking the first ten characters
          // from the ISO formatted date that the database uses
          favorite: res.data.favorite
        }
        this.setState({ favorite })
      })
      .catch(console.error)
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
      url: `${apiUrl}/favorites/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        favorite: this.state.favorite
      }
    })
      .then(res => this.setState({ updated: true }))
      .then(() => this.props.alert({
        heading: 'Success!',
        message: 'You updated your station.',
        variant: 'success'
      }))
      .catch(() => this.props.alert({
        heading: 'Something went wrong',
        message: 'Try again!',
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.updated) {
      return <Redirect to={`/favorites/${this.props.match.params.id}`} />
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

export default FavesEdit
