import React, { useContext } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import { userInputs } from './formSource'
import './style/dark.css'
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/AuthContext'
import Login from './pages/login/Login'
import { hotelColumns, roomColumns, userColumns } from './datatablesource'
import NewHotel from './pages/newHotel/NewHotel'
import NewRoom from './pages/newRoom/NewRoom'

const App = () => {
  const {darkMode}=useContext(DarkModeContext)
  
    const {user}=useContext(AuthContext)

  return (
   
    <div className={darkMode ? "app dark" :"app"}>
     <Routes>
     <Route exact path="/" element={!user?<Navigate to="/login"/>:<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/users" element={!user?<Navigate to="/login"/>:<List columns={userColumns}/>}/>
      <Route path="/users/:userId" element={!user?<Navigate to="/login"/>:<Single/>}/>
      <Route path="/users/new" element={!user?<Navigate to="/login"/>:<New inputs={userInputs} title="Add New User"/>}/>
      <Route path="/hotels" element={!user?<Navigate to="/login"/>:<List columns={hotelColumns}/>}/>
      <Route path="/rooms" element={!user?<Navigate to="/login"/>:<List columns={roomColumns}/>}/>
      <Route path="/products/:productId" element={!user?<Navigate to="/login"/>:<Single/>}/>
      <Route path="/hotels/new" element={!user?<Navigate to="/login"/>:<NewHotel />}/>
      <Route path="/rooms/new" element={!user?<Navigate to="/login"/>:<NewRoom />}/>
      </Routes> 
    </div>
  )
}

export default App
