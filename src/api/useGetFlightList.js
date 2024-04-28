import { useState, useEffect } from "react";

export const GetFlightList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        const jsonData = await response.json();
        setData(jsonData);
        setError(null); // Reset error state if successful
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
