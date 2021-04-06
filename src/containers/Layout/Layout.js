import React, { Component } from 'react'

import classes from './Layout.module.css'
import Favorites from '../../components/Favorites/Favorites'

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
