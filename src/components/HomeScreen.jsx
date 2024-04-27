import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightList from "./FlightList";

const HomeScreen = () => {
  const history = useNavigate();

  const [flightList, setFlightList] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [error, setError] = useState(null); // State to store error information

  const handleFlightClick = (id) => {
    history(`/details/${id}`);
  };

  // Api call for list of flights
  useEffect(() => {
    fetch("https://flight-status-mock.core.travelopia.cloud/flights")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFlightList(data);
        setFilteredFlights(data);
      })
      .catch((error) => {
        setError(error.message); // Store error message
      });
  }, []);

  const handleSearch = (value) => {
    if (value.trim() === "") {
      return setFilteredFlights([...flightList]);
    }
    const filteredFlights = flightList.filter(
      (flight) =>
        (flight.airline.toLowerCase().startsWith(value.toLowerCase()) ||
          flight.flightNumber.toLowerCase().startsWith(value.toLowerCase())) &&
        flight
    );
    setFilteredFlights([...filteredFlights]);
  };

  const listReload = () => {
    setFilteredFlights([...flightList]);
    document.getElementById("searchInput").value = "";
  };

  return (
    <div className="bg-container">
      <div className="container-main">
        <img
          className="travelopia-logo"
          src="https://www.drupal.org/files/travelopia_logo.png"
          alt="Travelopia"
        />
        <input
          className="inputSearch"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for Airlines"
          id="searchInput"
        />
        {error ? ( // Display error message if there's an error
          <div>
            <p>There was an error: {error}</p>
          </div>
        ) : filteredFlights.length === 0 ? (
          <>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDC--9Yyr-D39Xz483ujSkJmaZoR2Wt0tH6HI26JF0lw&s"
              alt="noFlight"
              className="noData-img"
            />
            <div className="noData-found">
              <h2>No Data Found....</h2>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy-U92_4HxzsNRM_LYgEtG_DJ2rCBFjKvgb1TzrDETfg&s"
                alt="sad emoji"
              />
            </div>
            <p onClick={listReload} className="reloadTxt">
              Back to flight list
            </p>
          </>
        ) : (
          <>
            {filteredFlights.map((data, index) => (
              <FlightList
                key={index}
                flightData={data}
                index={index}
                handleFlightClick={(id) => handleFlightClick(id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
