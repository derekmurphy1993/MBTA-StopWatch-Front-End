import React from 'react'
import { Link } from 'react-router-dom'

const FavesForm = ({ favorite, handleChange, handleSubmit }) => (
  <div className="col-sm-10 col-md-8 mx-auto mt-5">
    <h2>{favorite.id ? 'Update a favorite' : 'Add a favorite'}</h2>
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="ex. Home, Work, Library..."
        type="text"
        value={favorite.description}
        onChange={handleChange}
        name="description"
      />
      <input
        className="form-control mb-2"
        placeholder="ex. St. Mary's street, Kenmore, Alewife"
        type="text"
        value={favorite.station_id}
        onChange={handleChange}
        name="station_id"
      />
      <button type="submit" className="btn btn-primary mr-2">{favorite.id ? 'Update' : 'Add'}</button>
      <Link to={favorite.id ? `/favorites/${favorite.id}` : '/'} className="btn btn-secondary">Cancel</Link>
    </form>
  </div>
)

export default FavesForm
