import React, { Component } from 'react'
import axios from 'axios'
import mbtaUrl from '../../mbtaConfig'
import ListGroup from 'react-bootstrap/ListGroup'

class Test extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
      // do I need to call an anonymous object here????
    }
  }

  componentDidMount () {
    this.getTest()
  }

  componentDidUpdate () {
  }
  getTest = () => {
    axios({
      url: `${mbtaUrl}/predictions?filter[stop]=place-davis&sort=arrival_time&page[limit]=2`,
      method: 'GET'
      // possibley need header for API key for multiple calls
    })
      .then(response => {
        const predictions = response.response.data
        this.setState(predictions.map(p => (
          p.attributes.departure_time
        ))
        )
        // what am I putting here?!?
      })
      .catch(console.error)
  }

  render () {
    let testJsx = ''

    if (!this.state.data) {
      testJsx = <p>Loading...</p>
    } else {
      testJsx = this.state.data((train) => (
        <ListGroup.Item
          key={train.id}
          action
          href={`#/favorites/${train.relationships.stop.data.id}`}
          className="d-flex justify-content-between"
        >
          <h1>{train.response.request.response.data.attributes.departure_time}</h1>
        </ListGroup.Item>)
      )
    }

    // If you used just an li element above be sure to
    // substitute a ul element for the ListGroup below:
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>My Stops</h2>
        <ListGroup>
          {testJsx}
        </ListGroup>
      </div>
    )
  }
}

export default Test
