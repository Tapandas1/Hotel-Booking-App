import React, {  useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import './list.css'
import SearchItem from '../../components/searchItem/SearchItem';
import UseFetch from '../../hooks/UseFetch';

const List = () => {
  const location=useLocation()
  //console.log(location.state.destination)
  const[destination,setDestination]=useState(location.state.destination)
  const[dates,setDates]=useState(location.state.dates)
  const[openDate,setOpenDate]=useState(false)
  const[options,setOptions]=useState(location.state.options)
  const[min,setMin]=useState(undefined)
  const[max,setMax]=useState(undefined)
  const {data,loading ,error,reFetch}=UseFetch(`/hotels/city?city=${destination}&min=${min || 0}&max=${max || 999}`)
  const handleSearch=()=>{
    reFetch()
  }
  return (
    <>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Description</label>
              <input type="text" placeholder={destination}/>
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in-Date</label>
             <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )} `}</span>
              {openDate && <DateRange
              onChange={(item)=>setDates([item.selection])}
               ranges={dates}
               minDate={new Date()}/>
              }
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">Min Price <small>per night</small></span>
                <input type="number" onChange={(e)=>setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Max Price <small>per night</small></span>
                <input type="number" onChange={(e)=>setMax(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult</span>
                <input type="number" min={1} className="lsOptionInput" placeholder={options.adult}/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input type="number"  min={0}  className="lsOptionInput" placeholder={options.children} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input type="number"  min={1}  className="lsOptionInput" placeholder={options.room} />
              </div>
            </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? ("Loading"):(<>
            {data.map((item)=>(
            
            <SearchItem item={item} key={item._id}/>
          ))}
            </>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default List
