import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import AllFlights from "./AllFlights";
import axios from "axios";


/**
 * COMPONENT
 */
 const selected_origin = "MSY";
 const selected_destination = "IAD";

export const Home = (props) => {
  const [flights, setFlights] = useState([]);


  const { username } = props;

  const handleSearchButton = (event) => {
    event.preventDefault();
    console.log("in searchbutton")
    console.log(props)
    console.log("in searchbutton")
    console.log(event.target.from);
    const from = event.target.from.value;
    console.log(from)
    const destination = event.target.destination.value;
    console.log(destination);
     fetchData(from, destination);

  };

  const fetchData = async (from, destination) => {
    const { data } = await axios.get(
      `http://api.travelpayouts.com/v1/prices/calendar?depart_date=2022-11&currency=USD&origin=${from}&destination=${destination}&token=ed36fb1a96dc9c4593b94a42e1a6825a`
    );
    setFlights(data.data);
  };

  return (
    <div className="container">
      <h3 className="title">Book Your Flights {username}</h3>
      <div className="outer-form">
        <form onSubmit={handleSearchButton}>
          <label htmlFor="from">From:</label>
          <input name="from" type="text" placeholder="Leaving from..."></input>
          <label htmlFor="destination">To:</label>
          <input name="destination" type="text" placeholder="Going to..." />
          <button type="submit" className="form-button">
            Search
          </button>
        </form>
      </div>
      <AllFlights flights = {flights}/>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
