import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AllFlights from './AllFlights';
import Pagination from './Pagination';
import axios from 'axios';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

/**
 * COMPONENT
 */
//  const selected_origin = "MSY";
//  const selected_destination = "IAD";

export const Home = (props) => {
  const { username } = props;
  const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);
  // const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  console.log(flights);

  useEffect(() => {
    fetchCities();
  }, []);

  const handleSearchButton = (event) => {
    event.preventDefault();
    const fromFull = event.target.from.value;
    const fromSlice = fromFull.indexOf('-');
    const destinationFull = event.target.destination.value;
    const destSlice = destinationFull.indexOf('-');
    const from = fromFull.slice(fromSlice + 1) || 'empty';
    const destination = destinationFull.slice(destSlice + 1) || 'empty';
    fetchData(from, destination);
  };
  const fetchCities = async () => {
    const { data } = await axios.get('/api/airports');
    setCities(data);
  };
  const fetchData = async (from, destination) => {
    const { data } = await axios.get(
      `http://api.travelpayouts.com/v1/prices/calendar?depart_date=2022-11&currency=USD&origin=${from}&destination=${destination}&token=ed36fb1a96dc9c4593b94a42e1a6825a`
    );
    if (Object.keys(data.data).length === 0) {
      window.alert('No Flights Available!');
      // history.push('/login');
    }
    setFlights(data.data);
  };
  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Object.entries(flights).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  {
  }
  // console.log(Object.entries(flights).length);
  // console.log(currentPosts);
  return (
    <div className='box-container'>
      <div className='booking-container'>
        <h3 className='title'>Book Your Flights {username}</h3>
        <div className='outer-form'>
          <form onSubmit={handleSearchButton}>
            <div className='input-from-to'>
              <label htmlFor='from'></label>
              <input
                list='data1'
                name='from'
                type='text'
                placeholder='Leaving from...'
              />
              <datalist id='data1'>
                {cities.map((obj) => {
                  return (
                    <option key={obj.id}>
                      {obj.city}-{obj.IATA}
                    </option>
                  );
                })}
              </datalist>

              <BsFillArrowRightCircleFill size={70} />
              <label htmlFor='destination'></label>
              <input
                list='data1'
                name='destination'
                type='text'
                placeholder='Going to...'
              />
            </div>
            <button type='submit' className='form-button'>
              Search
            </button>
          </form>
        </div>
      </div>
      <AllFlights flights={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={Object.entries(flights).length}
        paginate={paginate}
      />
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
