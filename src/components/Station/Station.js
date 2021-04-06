import React from 'react'

import classes from './Station.module.css'

const station = (props) => {
  return (
    <div className={classes.blue}>
    <h2> {props.name} </h2>
    <h4> {props.street} </h4>
    <h1> {props.predictions} </h1>
    </div>
  )
}

export default station
