import {React,useState} from 'react'
import './register.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Register = () => {
  const[credentials,setCredentials]=useState({
    username:undefined,
    email:undefined,
    password:undefined,
    country:undefined,
    city:undefined,
    phone:undefined
})
const handleChange=(e)=>{
  setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
}

const navigate=useNavigate();

const handleRegister=async(e)=>{
  e.preventDefault();
  try{
    await axios.post('/auth/register',credentials);
    navigate("/login")
  }catch(err)
  {
    navigate("/register")
  }
}

const handleLogin=()=>{
  navigate("/login")
}
  return (
    <>
      <div className="register">
        <div className="rContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="rInput" />
            <input type="email" placeholder='email' id='email' onChange={handleChange} className="rInput" />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="rInput" />
            <input type="text" placeholder='country' id='country' onChange={handleChange} className="rInput" />
            <input type="text" placeholder='city' id='city' onChange={handleChange} className="rInput" />
            <input type="text" placeholder='phone' id='phone' onChange={handleChange} className="rInput" />
            <button   onClick={handleRegister} className="rButton">Register</button>
            <button   onClick={handleLogin} className="rButton">Already Registered! Go To Login</button>
        </div>
      </div>
    </>
  )
}

export default Register
