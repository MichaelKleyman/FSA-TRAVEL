import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const selected_origin = "MSY";
const selected_destination = "IAD";

function AllFlights() {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.travelpayouts.com/v1/prices/calendar?depart_date=2016-11&origin=${selected_origin}&destination=${selected_destination}&calendar_type=departure_date&token=ed36fb1a96dc9c4593b94a42e1a6825a&`
    );
    setFlights(data.data);
  };

  return (
    <div className="card-container">
      {Object.entries(flights).map(([k, flight]) => (
        <div key={k}>
          {/* <p>{JSON.stringify(flights[k], null, 2)}</p> */}

          <h5>{flight.price}</h5>
          <p>{flight.airline}</p>
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default AllFlights;
