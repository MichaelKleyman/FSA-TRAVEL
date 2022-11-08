import { useEffect } from "react";
import Axios from "axios";
import React from "react";

const origin = "MSY";
const destination = "IAD";

function AllFlights() {
  useEffect(() => {
    Axios.get(
      `https://api.travelpayouts.com/v1/prices/calendar?depart_date=2016-11&origin=${origin}&destination=${destination}&calendar_type=departure_date&token=ed36fb1a96dc9c4593b94a42e1a6825a&`
    )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div className="App">Hello World!</div>;
}

export default AllFlights;
