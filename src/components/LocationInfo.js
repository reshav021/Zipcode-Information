import React from "react"

const LocationInfo = ({ locationData }) => {
  return (
    <div>
      {locationData && (
        <div>
          <h3>Location Information</h3>
          <div className="location-info">
            <p>Place: {locationData.places[0]["place name"]}</p>
            <p>State: {locationData.places[0].state}</p>
            <p>Country: {locationData.country}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationInfo; 