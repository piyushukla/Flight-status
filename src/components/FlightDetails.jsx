import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStatusColor } from "../utility/color";
import { getTimeFromDateString,getCurrentTime } from "../utility/time";
import { GetFlightDetails } from "../api/useGetFlightDetails";

const FlightDetails = () => {
  const history = useNavigate();
  const { id } = useParams();

  const { data, error = null } = GetFlightDetails({ id });

  const navigateFlightList = () => {
    history("/");
  };

  return (
    <div className="bg-container">
      <div className="container-main">
        {error ? (
          <p>There was an error: {error}</p>
        ) : (
          <div className="detailParent-container">
            {/* flight heading */}
            <p className="back-btn" onClick={navigateFlightList}>
              Back
            </p>
            <div className="flightDetails-header">
              <p className="flightDetails">{data?.flightNumber} :</p>
              <p className="flightDetails">
                {data?.origin} {"->"} {data?.destination}{" "}
              </p>
            </div>
            <div className="flightDetails-status">
              <p className="flightDetails">{data?.airline}</p>
              <div
                className="flight-StatusBtnDetail"
                style={{ background: getStatusColor(data?.status) }}
              >
                <p className="flight-status">{data?.status}</p>
              </div>
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
                <p>{data?.destination}</p>
              </div>
              <div>
                <label className="footer-destination">Departure Time</label>
                <p>{getTimeFromDateString(data?.departureTime)}</p>
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
