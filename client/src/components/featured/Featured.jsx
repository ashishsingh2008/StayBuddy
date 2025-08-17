import "./featured.css"
import useFetch from "../../hooks/useFetch"
import React from 'react';
import {useNavigate} from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import {useContext, useState, useEffect} from 'react';

export const Featured = () => {
   
    const {data,loading,error}=useFetch("hotels/countByCity?cities=kanpur,mumbai,kolhapur");
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

    const navigateHotel = (event) =>{
        const h2Value = event.target.parentNode.querySelector("h2").innerHTML;
        setDestination(h2Value.toLowerCase());
    }
    
    useEffect(() => {
        if (destination) {
          dispatch({ type: 'NEW_SEARCH', payload: { destination, date, options } });
          navigate('/hotels', { state: { destination, date, options } });
        }
      }, [destination, dispatch, navigate]);

  return (
    <div className="featured"> 
   { loading ? ("Loading please wait"): <> 

   <div className="featuredItem" onClick={navigateHotel}>
        <img src="https://res.cloudinary.com/cloud0310/image/upload/v1688561094/utkarsh-bisht-shri-radhakrishna-temple-1_cresya.webp" alt="" className="featuredImage" />
        <div className="featuredTitles" >
            <h2>Kanpur</h2>
            <h3> {data[0]} properties</h3>
        </div>
    </div>

    <div className="featuredItem" onClick={navigateHotel}>
    <img src="https://res.cloudinary.com/cloud0310/image/upload/v1688560534/raj-rana-YtfUqAPLqMk-unsplash_qflctx.jpg" alt="" className="featuredImage" />
        <div className="featuredTitles">
            <h2>Mumbai</h2>
            <h3> {data[1]} properties</h3>
        </div>
    </div>
    <div className="featuredItem" onClick={navigateHotel}>
        <img src="https://res.cloudinary.com/cloud0310/image/upload/v1688558774/girish-dalvi-SBkT1yvW0Xw-unsplash_2_ewzgiv.jpg" alt="" className="featuredImage" />
        <div className="featuredTitles">
            <h2>Kolhapur</h2>
            <h3> {data[2]} properties</h3>
        </div>
    </div></>}
    </div>
  )
}
