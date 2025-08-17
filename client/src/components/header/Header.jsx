
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed,
        faCalendarDays,
        faPerson} from "@fortawesome/free-solid-svg-icons";
 import { DateRange } from 'react-date-range';
 import {useContext, useState} from 'react'
 import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useNavigate} from "react-router-dom";
import React from 'react';
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


export const Header = ({type}) => {

  const {user}=useContext(AuthContext)
  const [opendate, setOpendate] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);


  const navigate=useNavigate();

  const [destination, setDestination] = useState("");
  
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


  const handleOption =(name,operation)=>{
     setOptions((prev)=>{return{
      ...prev,
      [name]:operation ==="i" ? options[name]+1:options[name]-1,

     };
    });
  };

  const {dispatch}=useContext(SearchContext)

  const handleSearch = () => {
      dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
      navigate("/hotels", { state: { destination, date, options } });
  }
  
  return (
    <div className="header">
      <div className={type==="list"?"headerContainer listMode":"headerContainer"}>
       <div className="headerList">
        </div>
        { 
           type!=="list" &&
          <><h1 className="headerTitle">A life full of sale.. It's great</h1>
        <p className="headerDesc">
        Welcome to new era of booking your favorite accomdations!! Enjoy the hotels with us... have fun!!
        </p>
        {!user && <Link to="/register" style={{color:"inherit",textDecoration:"none"}}> <button className="headerBtn">Sign in/Register</button> </Link>}


        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                <input type="text"placeholder="Where do you wish to visit?" className="headerSearchInput" onChange={e=>setDestination((e.target.value.toLowerCase()))}/>
            </div>

            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
               <span onClick={()=>setOpendate(!opendate)} className="headerSearchText">{`${format(date[0].startDate,"MM/dd/yyyy")}`}to {`${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                {opendate && <DateRange
                 editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()} />}
            </div>

            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                <span onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>

               {openOptions && <div className="options">
                  <div className="optionItem">
                   <span className="optionText">Adult</span>
                    <div className="optionCounter">
                    <button disabled={options.adult<=1} className="optionCounterbutton" onClick={()=>handleOption("adult","d")}>-</button>
                    <span className="optionCounterNumber" >{options.adult}</span>
                    <button className="optionCounterbutton" onClick={()=>handleOption("adult","i")}>+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">children</span>
                    <div className="optionCounter">
                    <button  disabled={options.children<=0}className="optionCounterbutton" onClick={()=>handleOption("children","d")}>-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterbutton" onClick={()=>handleOption("children","i")}>+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                    <button disabled={options.room<=1}className="optionCounterbutton" onClick={()=>handleOption("room","d")}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterbutton" onClick={()=>handleOption("room","i")}>+</button>
                  </div>
                </div>
            </div>}
            
          </div>
          <div className="headerSearchItem">
                <button  onClick={handleSearch} className="headerBtn">Search</button>
            </div>
        </div></>}
      </div>
      </div>
  );
};

