import React from "react";
import { AIRLINES_LOGOS } from "../Constant";
import {
  formatDateTime,
  generateRandomNumber,
  getStatusColor,
} from "../utility";

const FlightList = ({ flightData = [], index = 0, handleFlightClick }) => {
  return (
    <>
      <div
        className="data-container"
        style={{ marginTop: index === 0 && "50px" }}
        onClick={() => handleFlightClick(flightData?.id)}
      >
        {/* Flight Namm */}
        <div className="flight-entry-container">
          <div className="flight-entry">
            <img
              src={AIRLINES_LOGOS[generateRandomNumber()]}
              alt="flight-img"
              className="flight-icon"
            />
            <p className="airline-title">{flightData?.airline}</p>
          </div>
          <p className="flight-no">{flightData?.flightNumber}</p>
        </div>
        {/* Destination container */}
        <div className="flight-entry">
          <p>{formatDateTime(flightData?.departureTime)}</p>
          <p className="destination-txt">{flightData?.origin}</p>
        </div>
        {/* Flight Status */}
        <div className="flight-entry">
          {" "}
          <p
            className="flight-status"
            style={{ color: getStatusColor(flightData?.status) }}
          >
            {flightData?.status}
          </p>
          <p className="destination-txt">{flightData?.destination}</p>
        </div>
      </div>
    </>
  );
};
export default FlightList;
