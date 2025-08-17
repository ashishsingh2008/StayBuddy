import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css";
import { useEffect } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axiosInstance from "../../hooks/api"
import { useNavigate } from "react-router-dom"

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`)
  const { date } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const Alldates = getDatesInRange(date[0]?.startDate, date[0]?.endDate);


  const IsAvailabe = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => Alldates.includes(new Date(date).getTime()));
    return !isFound;
  };

  useEffect(() => {
  }, [selectedRooms]);

  const handleSelect = (e) => {
    const checked = e.target.checked;//boolean value
    const value = e.target.value;//room id mil rhi

    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
  }


  const navigate = useNavigate();

  const handleClick = async () => {
    if (selectedRooms.length > 0) {
      try {
        let promise = await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axiosInstance.put(`/rooms/availability/${roomId}`, {
              dates: Alldates,
            });

            return res.data;
          })
        );
        setOpen(false);
        alert("Reserved Successfully");
        navigate("/");
      } catch (err) { }
    } else {
      alert("atleast choose 1 room")
    }
  };

  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span> Select your Rooms: </span>
        {
          data.map((item, index) => (

            <div className="rItem" key={index}>
              <div className="rItemInfo">
                <div className="rTitle">       {item.title}     </div>
                <div className="rDesc">   {item.desc}         </div>
                <div className="rMax">  Max People :  {item.maxPeople}</div>
                <div className="rPrice">  Max Price : Rs.{item.price}</div>
              </div>

              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumbers, i) => (
                  <div className="room" key={i}>
                    <label>{roomNumbers.number}</label>
                    <input type="checkbox" value={roomNumbers._id} onChange={(e) => { handleSelect(e) }} disabled={!IsAvailabe(roomNumbers)} />

                  </div>
                ))}
              </div>
            </div>

          ))
        }
        <button className="rButton" onClick={(e) => { handleClick(e) }}>Reserve Now!</button>
      </div>
    </div>
  )
}

export default Reserve