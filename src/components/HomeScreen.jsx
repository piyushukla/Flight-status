import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightList from "./FlightList";
import { GetFlightList } from "../api/useGetFlightList";

const HomeScreen = () => {
  const history = useNavigate();
  const { data, loading, error } = GetFlightList();

  const [filteredFlights, setFilteredFlights] = useState([]);
  const [errorApi, setError] = useState(null); // State to store error information
  const [searchInput, setSearchInput] = useState("");
  const [showLoadingMsg, setShowLoadingMsg] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFilteredFlights([...data]);
      setError(error);
    }
  }, [data, loading, error]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      if (!response.ok) {
        throw new Error(
          "There was an error reaching to our server. Please try again later"
        );
      }
      const data = await response.json();
      setFilteredFlights([...data]);
      setShowLoadingMsg(false);
    } catch (error) {
      setError(error.message);
      setShowLoadingMsg(false);
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch data every 30 seconds
      fetchData();
      setShowLoadingMsg(true);
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
  }, []);

  useEffect(() => {
    setShowLoadingMsg(false);
  }, [data]); // Hide loading message when data changes

  const handleFlightClick = (id) => {
    history(`/details/${id}`);
  };

  // Api call for list of flights

  const handleSearch = (value) => {
    setSearchInput(value);
    if (value.trim() === "") {
      return setFilteredFlights([...data]);
    }
    const filteredFlights = data.filter(
      (flight) =>
        (flight.airline.toLowerCase().startsWith(value.toLowerCase()) ||
          flight.flightNumber.toLowerCase().startsWith(value.toLowerCase())) &&
        flight
    );
    setFilteredFlights([...filteredFlights]);
  };

  const listReload = () => {
    setFilteredFlights([...data]);
    setSearchInput("");
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
          value={searchInput}
        />
        {errorApi && ( // Display error message if there's an error
          <div>
            <p>There was an error: {errorApi}</p>
          </div>
        )}
        {loading || showLoadingMsg ? (
          <p>Refreshing flight data...</p>
        ) : (
          <>
            {filteredFlights.length === 0 ? (
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
                {!loading && (
                  <p onClick={listReload} className="reloadTxt">
                    Back to flight list
                  </p>
                )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
