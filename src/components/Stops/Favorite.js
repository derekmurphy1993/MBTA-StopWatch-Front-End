import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, Redirect } from 'react-router-dom'

class Favorite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/favorites/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => {
        this.setState({ favorite: res.data.favorite })
      })
      .catch(console.error)
  }

  handleDelete = () => {
    axios({
      url: `${apiUrl}/favorites/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.props.alert({
        heading: 'Done!',
        message: `You deleted ${this.state.favorite.title}.`,
        variant: 'info'
      }))
      .then(this.setState({ deleted: true }))
      // Alternate to using the Redirect component

      .catch(() => this.props.alert({
        heading: 'Something went wrong',
        message: 'Try again!',
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.deleted) {
      return <Redirect to={
        {
          pathname: '/',
          state: { deleted: this.state.favorite.id }
        }
      } />
    }

    if (!this.state.favorite) {
      return <p>Loading</p>
    }

    // Don't forget you can use Javascript expressions
    // in your render inside `{}` such as to format a date
    // or use logical operations or ternary operators.  To
    // display just the year portion of the date we get
    // from the server, you can just use the string method
    // substring to get from the first to the fourth character
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>{this.state.favorite.description}</h2>
        <h5>{this.state.favorite.station.name}</h5>
        <h5>{this.state.favorite.station.url_path}</h5>
        <hr/>
        <div>
          {this.props.user && (this.props.user._id === this.state.favorite.owner._id) &&
            (
              <React.Fragment>
                <Link className="btn btn-primary mr-2" to={`/favorites/${this.props.match.params.id}/edit`}>Edit</Link>
                <button className="btn btn-danger mr-2" onClick={this.handleDelete}>Delete</button>
              </React.Fragment>
            )
          }
          <Link className="btn btn-secondary" to="/">Back</Link>
        </div>
      </div>
    )
  }
}

export default Favorite
