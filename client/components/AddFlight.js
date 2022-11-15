import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { addFlight } from '../store/addFlight';
import { fetchCart } from '../store/addCart';

function AddFlight(props) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.id);

  const addFlightToCart = (flight) => {
    console.log(flight);

    window.localStorage.setItem('save', JSON.stringify(flight));
    console.log(addFlight(flight));
    dispatch(addFlight(flight));
    dispatch(fetchCart(auth));

  };

  return (
    <button className='card-btn2' onClick={() => addFlightToCart(props.flight)}>
      Add To Cart
    </button>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   addFlight: (flight) => dispatch(addFlight(flight)),
// });

// class AddFlight extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: this.props.date,
//       origin: this.props.origin,
//       destination: this.props.destination,
//       price: this.props.price,
//       flight_number: this.props.flight_number,
//       departure_at: this.props.departure_at,
//       airline: this.props.airline,
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     console.log(event);
//     console.log(this.state);
//     addFlight({ ...this.state });
//   }

//   render() {
//     const { handleSubmit } = this;
//     return (
//       <button className="card-btn2" onClick={handleSubmit}>
//         Add To Cart
//       </button>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   addFlight: (flight) => dispatch(addFlight(flight)),
// });
// export default connect(null, mapDispatchToProps)(AddFlight);
export default AddFlight;
