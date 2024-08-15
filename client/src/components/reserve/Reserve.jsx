import {React,useContext,useState} from 'react'
import './reserve.css'
import {Close } from "@material-ui/icons";
import UseFetch from '../../hooks/UseFetch';
import { SearchContext } from '../../context/SearchContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Reserve = ({setOpen,hotelid}) => {
    const[selectedRooms,setSelectedRooms]=useState([])
    const{data,loading,error}=UseFetch(`/hotels/room/${hotelid}`)
    const{dates}=useContext(SearchContext)
    const navigate=useNavigate()
    const getDatesInRange=(start,end)=>{
        const date=new Date(start.getTime());
        const list=[]
        while(date<=end){
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return list
    }
    //console.log(getDatesInRange(dates[0].startDate,dates[0].endDate))
    const alldates=getDatesInRange(dates[0].startDate,dates[0].endDate)

    const isavailable=(roomNumber)=>{
   const isFound=roomNumber.unavailableDates.some((date)=>
       alldates.includes(new Date(date).getTime()))
       return !isFound
    }
    const handleSelect=(e)=>{
       const checked=e.target.checked;
       const value=e.target.value;
       setSelectedRooms(checked ? [...selectedRooms,value]:selectedRooms.filter((item)=>(
        item!==value
       )))
    }
    const handleClick=async()=>{
        try{
            await Promise.all(selectedRooms.map((roomId)=>{
                const res=axios.put(`/rooms/availability/${roomId}`,{dates:alldates})
                //console.log(res)
                //alert(res.data)
                return res.data;
            }))
            setOpen(false)
           
            navigate("/")
        }catch(err)
        {

        }

    }
  return (
    <>
     <div className="reserve">
        <div className="rContainer">
            <Close className='rClose' onClick={()=>setOpen(false)}/>
            <span>Select your rooms:</span>
            {data.map((item)=>(
                <div className="rItem" key={item._id}>
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">Max People :<b>{item.maxPeople}</b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectRooms">
                        {item.roomNumbers.map((roomNumber)=>(
                            <div className="room">
                            <label >{roomNumber.number}</label>
                            <input type="checkbox" value={roomNumber._id}  onChange={handleSelect} disabled={!isavailable(roomNumber)}/>
                            </div>
                        ))}
                   </div>
                </div>
            ))}
            <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
     </div>
    </>
  )
}

export default Reserve
