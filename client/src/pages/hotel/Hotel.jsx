import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import "./hotel.css";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";
import { useContext, useState } from "react";
import React from "react";
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

export const Hotel = () => {
  const location=useLocation();
  const id=location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open,setOpen]=useState(false);
  const [openModel,setOpenModel]=useState(false);

  const {data,loading,error}=useFetch(`/hotels/find/${id}`)
  const {date,options}=useContext(SearchContext);

  const navigate=useNavigate();

  const {user} =useContext(AuthContext);



  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days=dayDifference(date[0]?.endDate,date[0]?.startDate);

 
  const handleOpen=(i) =>{
    setSlideNumber(i);
    setOpen(true);
  };

  const photoCount=data.photos?.length-1;

  const handleMove=(direction)=>{
    let newSliderNumber;
    if(direction==="l"){ newSliderNumber=slideNumber===0? photoCount:slideNumber-1;}
    else{newSliderNumber=slideNumber===photoCount? 0:slideNumber+1;}

    setSlideNumber(newSliderNumber);
  }

  const handleClick =(e)=>{

    if (days === 0) {
      alert("Please Choose Check-in and Check-Out dates");
      alert("Please proceed to HomePage for selecting dates :)")
      navigate('/');
      return false;
    }

     if(user)
     {
        setOpenModel(true);
     }else{
       navigate("/login")
     }
  }
  return (
    <div className="main2">
      <Navbar/>
      <Header type="list"/>
     {loading ?"Loading" : <> <div className="hotelContainer">

       {open && <div className="slider">
        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>

        <div className="sliderWrapper">
          <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
        </div>

        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
          </div>
        }

        <div className="hotelWrapper">
            <h1 className="hotelTitle">
            {data.name}
            </h1>

            <div className="hotelImages">
              {data.photos?.map((photo,i)=>(
                <div className="hotelImgWrapper">
              <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>  
              
          <div className="hotelDetails">
                <div className="hotelDetailsText">
                    <div>
                          <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <span>{data.address}</span>
                          </div>
                          <br />
                          <span className="hotelDistance">Excellent location {data.distance} from center</span>
                          <br />
                          <span className="hotelPriceHighlight">Book a stay at Rs. {data.cheapestPrice} and get free airport taxi</span>
                    </div>

                    <p className="hotelDesc">
                    {data.desc}
                    </p>  
                </div>

                <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>Rs.{days*data.cheapestPrice*options.room}</b> ({days} nights)
                  </h2>
                  <button onClick={(e)=>handleClick(e)} >Reserve or Book Now!</button>
                </div>
          </div>

        </div>
        <MailList/>
        <Footer/>
      </div></> }
      {openModel && <Reserve setOpen={setOpenModel}  hotelId={id}/> }
    </div>
  )
}
