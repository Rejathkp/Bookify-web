import { useContext, useState } from 'react'
import { AuthContext } from "../../context/AuthContext"
import './login.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
      e.preventDefault()
      dispatch({ type:"LOGIN_START" })
      try {
        const res = await axios.post("/auth/login", credentials)
        dispatch({ type:"LOGIN_SUCCESS", payload: res.data.details })
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } catch (err) {
        dispatch({ type:"LOGIN_FAILURE", payload: err.response.data })
      }
    }

  return (
    <div className='login'>
      <div className="lContainer">
        <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
        <button disabled={loading} onClick={handleClick} className='lButton'>Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login



// import React, { useContext, useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContext'
// import axios from "axios"

// const LoginPopup = ({setShowLogin}) => {

//     const {url,setToken} = useContext(StoreContext)

//     const [currState,setCurrState] = useState("Login")
//     const [ data, setData ] = useState({
//         name:"",
//         email:"",
//         password:""
//     })

//     const onChangeHandler = (e) => {
//         const name = e.target.name
//         const value = e.target.value
//         setData(data=> ({...data,[name]:value}))
//     }

//     const onLogin = async (e) => {
//         e.preventDefault()
//         let newUrl = url;
//         if (currState==="Login"){
//             newUrl += "/api/user/login"
//         }
//         else{
//             newUrl += "/api/user/register"
//         }

//         const response = await axios.post(newUrl,data);

//         if(response.data.success){
//             setToken(response.data.token)
//             localStorage.setItem("token",response.data.token)
//             setShowLogin(false)
//         }
//         else{
//             alert(response.data.message)
//         }
//     }

//   return (
//     <div className='login-popup'>
//         <form onSubmit={onLogin} className="login-popup-container">
//             <div className="login-popup-title">
//                 <h2>{currState}</h2>
//                 <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//             </div>
//             <div className="login-popup-inputs">
//                 {currState==="Login"?<></>:
//                 <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
//                 <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
//                 <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
//             </div>
//             <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
//             <div className="login-popup-condition">
//                 <input type="checkbox" required/>
//                 <p>By continuing, I agree to the terms and of use and privacy policy.</p>
//             </div>
//             {currState==="Login"
//             ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
//             :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
//             }
//         </form>
//     </div>
//   )
// }

// export default LoginPopup