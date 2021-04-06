import React from 'react'

import Station from '../Station/Station'
import classes from './Favorites.module.css'

const favorites = (props) => {

  let favStations = props.favorites.map(fav => {
      return <Station name={fav.title}
        color={fav.color}
        street={fav.at_street}
        predictions={fav.predictions}
        />
  })
    // .reduce((arr, el) => {
    //   return arr.concat(el)
    // }, [])
    // reduce array into one array

    if (favStations.length === 0) {
      favStations = <p> "link" add a station to start tracking </p>
    }

  return (
    <div className={classes.favorites}>
    <h2> favorite trains! :3  </h2>
    <ul>
    {favStations}
    </ul>
    </div>
  )
}

export default favorites
