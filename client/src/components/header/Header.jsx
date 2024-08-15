import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import {
  Hotel,
  Flight,
  LocalTaxi,
  DirectionsCar,
  DateRangeRounded,
  Wc,
} from "@material-ui/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
const Header = ({type}) => {
  const navigate=useNavigate()
  const[destination,setDestination]=useState("")
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
const{dispatch}=useContext(SearchContext)
  const handleSearch=()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
  navigate("/hotels",{state:{destination,dates,options}})
  }
  const {user}=useContext(AuthContext)
  return (
    <>
      <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
          <div className="headerList">
            <div className="headerListItem active">
              <Hotel />
              <span>Stays</span>
            </div>
            <div className="headerListItem">
              <Flight />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <DirectionsCar />
              <span>Car Rental</span>
            </div>

            <div className="headerListItem">
              <Hotel />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <LocalTaxi />
              <span>Airport Taxi</span>
            </div>
          </div>
          { type !== "list" &&
            <>
          <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
          <p className="headerDesc">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Tapanbooking account
          </p>
         {!user && <button className="headerBtn">Sign In /Register</button>}
          <div className="headerSearch">
            <div className="headerSearchItem">
              <Hotel className="headerIcon" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput"
                onChange={(e)=>setDestination(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <DateRangeRounded className="headerIcon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )} `}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="headerSearchItem">
              <Wc className="headerIcon" />
              <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">
                {`${options.adult} adult . ${options.children} children . ${options.room} room`}
              </span>
             {openOptions &&  <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                    disabled={options.adult<=1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                    disabled={options.children<=0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                    disabled={options.room<=1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
             </div>
}
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
          </>}
        </div>
      </div>
    </>
  );
};

export default Header;
