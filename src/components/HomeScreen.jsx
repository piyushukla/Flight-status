import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightList from "./FlightList";
import useFlightApi from "../Apis";

const HomeScreen = () => {
  const history = useNavigate();

  const [flightList, setFlightList] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [errorApi, setError] = useState(null); // State to store error information
  const [showLoading, setShowLoading] = useState(true);

  const { data, loading, error } = useFlightApi(
    "https://flight-status-mock.core.travelopia.cloud/flights"
  );

  useEffect(() => {
    if (!loading) {
      setFilteredFlights([...data]);
      setError(error);
      setShowLoading(loading);
    }
  }, [flightList, loading, error]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFilteredFlights([...data]);
      setShowLoading(false);
    } catch (error) {
      setError(error.message);
      setShowLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch data every 30 seconds
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
  }, []);

  const handleFlightClick = (id) => {
    history(`/details/${id}`);
  };

  // Api call for list of flights

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
    setShowLoading(false);
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
        {errorApi ? ( // Display error message if there's an error
          <div>
            <p>There was an error: {errorApi}</p>
          </div>
        ) : filteredFlights.length === 0 ? (
          <>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDC--9Yyr-D39Xz483ujSkJmaZoR2Wt0tH6HI26JF0lw&s"
              alt="noFlight"
              className="noData-img"
            />
            <div className="noData-found">
              <h2>{showLoading ? "Data Loading...." : "No Data Found...."} </h2>
              {!showLoading && (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy-U92_4HxzsNRM_LYgEtG_DJ2rCBFjKvgb1TzrDETfg&s"
                  alt="sad emoji"
                />
              )}
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
