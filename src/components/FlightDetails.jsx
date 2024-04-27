import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCurrentTime,
  getTimeFromDateString,
  getStatusColor,
} from "../utility";
import useFlightApi from "../Apis";

const FlightDetails = () => {
  const history = useNavigate();
  const [flightDetails, setFlightDetails] = useState([]);
  const [errorApi, setErrorApi] = useState(null); // State to store error information
  const { id } = useParams();

  const { data, error = null } = useFlightApi(
    `https://flight-status-mock.core.travelopia.cloud/flights/${id}`
  );

  useEffect(() => {
    setFlightDetails(data);
    setErrorApi(error);
  }, [data, error]); // Include 'id' in dependency array to fetch data when 'id' changes

  const navigateFlightList = () => {
    history("/");
  };

  return (
    <div className="bg-container">
      <div className="container-main">
        {errorApi ? (
          <p>There was an error: {errorApi}</p>
        ) : (
          <div className="detailParent-container">
            {/* flight heading */}
            <p className="back-btn" onClick={navigateFlightList}>
              Back
            </p>
            <div className="flightDetails-header">
              <p className="flightDetails">{flightDetails?.flightNumber} :</p>
              <p className="flightDetails">
                {flightDetails?.origin} {"->"} {flightDetails?.destination}{" "}
              </p>
            </div>
            <div
              className="flightDetails-header"
              style={{ justifyContent: "space-between" }}
            >
              <p className="flightDetails">{flightDetails?.airline}</p>
              <p
                className="flightDetails"
                style={{
                  color: getStatusColor(flightDetails?.status),
                }}
              >
                {flightDetails?.status}
              </p>
            </div>

            <div className="centered-image">
              <img
                src="https://www.transparentpng.com/thumb/airplane/airplane-photos-11.png"
                alt="flight"
              />
            </div>
            <div className="footer-container">
              <div>
                <label className="footer-destination">Destination</label>
                <p>{flightDetails?.destination}</p>
              </div>
              <div>
                <label className="footer-destination">Departure Time</label>
                <p>{getTimeFromDateString(flightDetails?.departureTime)}</p>
              </div>
              <div>
                <label className="footer-destination">Estimate Arrival</label>
                <p>21:06:03</p>
              </div>
              <div>
                <label className="footer-destination">Current Time</label>
                <p>{getCurrentTime()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetails;
