import "./featuredProperties.css"
import React from 'react';
import useFetch from "../../hooks/useFetch"
import {useNavigate} from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import {useContext, useState} from 'react';




export const FeaturedProperties = () => {

  const {data,loading,error}=useFetch("hotels?featured=true");
  const navigate=useNavigate();
  const [destination, setDestination] = useState("");
  const {dispatch}=useContext(SearchContext);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


  const navigateHotel = (item) => {
    setDestination(item.city)
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate(`/hotels/${item._id}`, { state: { destination, date, options } });
  }

  return (
    <div className="fp">
     {loading ? "Loading" :<> {data.map((item)=>(         
        <div className="fpItem" key={item._id} onClick={()=>navigateHotel(item)} >
          <img
            src={item.photos[0]}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city.charAt(0).toUpperCase() + item.city.slice(1)}</span>
          <span className="fpPrice">Starting from Rs.{item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
        ))}
      </>}
     </div>
  )
}
