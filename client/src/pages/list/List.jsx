import "./list.css"
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { SearchItem } from "../../components/searchItem/SearchItem"
import React from "react";
import useFetch from "../../hooks/useFetch"

export const List = () => {
  const location=useLocation();
  const [destination,setDestination]=useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false)
  const [date,setDate]=useState(location.state.date);
  const [options,setOptions]=useState(location.state.options);
  const [min,setMin]=useState(undefined);
  const [max,setMax]=useState(undefined);
  const { data, loading, error,reFetch}=useFetch(`hotels?city=${destination}&min=${min || 0}&max=${max || 100000}`);


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days=dayDifference(date[0]?.endDate,date[0]?.startDate);

  const handleClick=()=>{
      reFetch();
  }
  return (
    <div className="main3">
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
       <div className="listWrapper">
        <div className="listSearch">
            <h1 className="lsTitle">
              Search
            </h1>
            <div className="lsItem">
              <label>DESTINATION: </label>
              <input placeholder={destination} type='text' onChange={e=>setDestination(e.target.value.toLowerCase())}/>
            </div>
            <div className="lsItem">
              <label>CHECK-IN-DATES: </label>
             <span className="date_search"> {`${format(date[0].startDate,"MM/dd/yyyy")}`}to {`${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
            </div>
            <div className="lsItem">
              <label>OPTIONS:</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price <small>per night</small> Rs.
                </span>
                <input  type="number"  onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price <small>per night</small> Rs.
                </span>
                <input  type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adults
                </span>
                <input  type="number"  min={1} className="lsOptionInput" placeholder={options.adult} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Children 
                </span>
                <input  type="number" min={0} className="lsOptionInput"  placeholder={options.children} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Room
                </span>
                <input  type="number"  min={0} className="lsOptionInput"  placeholder={options.room} />
              </div>
              </div>
            </div>
            <button onClick={handleClick} >Search</button>
          </div>
        <div className="listResult">
          
           
              {loading ? "Loading" :
                <>
                  {Array.isArray(data) && data.length > 0 ? data.map(item => (
                  <SearchItem item={item} key={item._id} />
                   )) : "No Hotels Available"}
               </>
              }
        </div>
       </div>
      </div>
    </div>
   
  )
}
