import React, { useContext } from "react";
import "./sidebar.css";
import {
  Dashboard,
  Person,
  LocalShipping,
  InsertChart,
  Settings,
  ExitToApp,
  AccountCircle,
  NotificationsOutlined,
  Store,
  SettingsSystemDaydream,
  SingleBed
} from "@material-ui/icons";
import {Link} from "react-router-dom"
import { DarkModeContext } from "../../context/darkModeContext";
const Sidebar = () => {
  const{dispatch}=useContext(DarkModeContext)
  return (
    <>
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">TapanAdmin</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/" style={{textDecoration:"none"}}>
            <li>
              <Dashboard className="icon"  />
              <span>Dashboard</span>
            </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/users" style={{textDecoration:"none"}}>
            <li>
              <Person className="icon" />
              <span>Users</span>
            </li>
            </Link>
            <Link to="/hotels" style={{textDecoration:"none"}}>
            <li>
              <Store  className="icon" />
              <span>Hotels</span>
            </li>
            </Link>
            <Link to="/rooms" style={{textDecoration:"none"}}>
            <li>
              <SingleBed className="icon" />
              <span>Rooms</span>
            </li>
            </Link>
            <li>
              <LocalShipping className="icon" />
              <span>Delivery</span>
            </li>
            <p className="title">USEFUL</p>
            <li>
              <InsertChart className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsOutlined className="icon" />
              <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <li>
              <SettingsSystemDaydream className="icon" />
              <span>System Health</span>
            </li>
            <li>
              <Settings  className="icon" />
              <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
              <AccountCircle className="icon"  />
              <span>Profile</span>
            </li>
            <li>
              <ExitToApp className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
          <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
