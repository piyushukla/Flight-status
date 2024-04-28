import { useState, useEffect } from "react";

export const GetFlightDetails = ({ id = 0 }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://flight-status-mock.core.travelopia.cloud/flights/${id}`
      );
      if (!response.ok) {
        throw new Error(
          "There was an error reaching to our server. Please try again later"
        );
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };

  useEffect(() => {
    if (data?.length > 0) return;
    fetchData();
  }, [id]);

  return { data, error };
};

