import React, { useState } from "react"
import LocationInfo from "./LocationInfo"

const ZipCodeInfo = () => {
  const [postalCode, setPostalCode] = useState("")
  const [locationData, setLocationData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`https://api.zippopotam.us/in/${postalCode}`)
      if (!response.ok) {
        throw new Error("Invalid postal code.")
      }
      const data = await response.json()
      setLocationData(data)
      setSearchHistory([...searchHistory, data])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearchHistory([])
  }

  return (
    <div>
      <center>
        <div id="page-wrapper">
          <a> Zip Code Information App </a>

          <div>
            <form onSubmit={handleSubmit}>
              <br />
              <label>Enter Postal Code:(400093, 110001):</label>
              <br />
              <input
                type="text"
                id="postalCodeInput"
                value={postalCode}
                className="inputText"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <br />
              <button className="submitBtn" type="submit">
                Search
              </button>
            </form>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
          </div>

          <div className="data-container">
          {locationData && (
            <LocationInfo locationData={locationData}></LocationInfo>
          )}

          {searchHistory.length > 0 && (
            <div>
              <h3>Search History</h3>
              <div className="search-history">
                {searchHistory.map((record, index) => (
                  <div key={index} className="scrollable">
                    <p>Country: {record.country}</p>
                    <p>State: {record.places[0].state}</p>
                    <p>Place Name: {record.places[0]["place name"]}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleClear} className="clearBtn">Clear All</button>
            </div>
          )}
        </div>
        </div>

        
      </center>
    </div>
  )
}

export default ZipCodeInfo;