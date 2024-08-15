import React, { useContext } from "react";
import "./navbar.css";
import {
  Search,
  Language,
  FullscreenExit,
  NotificationsNone,
  ChatBubbleOutline,
  List,
  Brightness2,
} from "@material-ui/icons";
import { DarkModeContext } from "../../context/darkModeContext";
const Navbar = () => {
  const{dispatch}=useContext(DarkModeContext)
  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="search">
            <input type="text" placeholder="search..." />
            <Search />
          </div>
          <div className="items">
            <div className="item">
              <Language className="icon" />
              English
            </div>
            <div className="item">
              <Brightness2  className="icon" onClick={()=>dispatch({type:"TOGGLE"})}/>
            </div>
            <div className="item">
              <FullscreenExit  />
            </div>
            <div className="item">
              <NotificationsNone className="icon" />
              <div className="counter">1</div>
            </div>
            <div className="item">
              <ChatBubbleOutline className="icon" />
              <div className="counter">2</div>
            </div>
            <div className="item">
              <List className="icon" />
            </div>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
