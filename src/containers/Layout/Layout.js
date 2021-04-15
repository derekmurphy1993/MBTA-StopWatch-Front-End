import React, { Component } from 'react'

import classes from './Layout.module.css'
import Favorites from '../../components/Favorites/Favorites'
import axios from 'axios'


class Layout extends Component {
  state = {
    favorites: [{
      title: 'booger',
      at_street: 'essex',
      color: 'blue',
      predictions: '2:45'
    },
    {
      title: 'brat',
      at_street: 'washington',
      color: 'green',
      predictions: '2:43'
    }]
  }

// https://api-v3.mbta.com/trips/?filter%5Broute%5D=CR-Providence&include=shape&fields%5Btrip%5D=name&fields%5Bshape%5D=name
// /relationships/stop/data/id

componentDidMount () {
    axios.get('https://reacttutorial-f9977-default-rtdb.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
      .catch( error => {
        this.setState({error: true})
      })
  }

  render (){
    return(
      <div className={classes.Layout}>
        <p> navigation! </p>
        <Favorites favorites={this.state.favorites}/>
        <p> footer </p>
      </div>
    )
  }
}


export default Layout
