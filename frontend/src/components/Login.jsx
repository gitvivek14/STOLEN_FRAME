import React from 'react'

import {GoogleLogin , UseGoogleLoginOptions,CredentialResponse} from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import {client} from '../container/client'
import logo from '../assets/logowhite.png'
import jwt_decode from "jwt-decode";

const Login = () => {
const navigate = useNavigate();
  const responsegoogle = (res)=>{
    console.log(res);
    var decoded = jwt_decode(res.credential);
    const id = res.credential.slice(0,6)
    localStorage.setItem('user',JSON.stringify(decoded))
   
    const {name,picture,email,aud} = decoded
    console.log(decoded)
    const doc = {
      _id:id,
      _type:'user',
      username : name,
      image:picture
    }

    client.createIfNotExists(doc).then(()=> navigate('/',{replace:true}))

  }
  return (
    <div className='flex justify-start items-center
     flex-col h-screen'>
      <div className='w-full h-full relative '>
        <video autoPlay muted loop id="myVideo" className='w-full h-full object-cover' src={shareVideo}></video>
        <div className="absolute flex flex-col z-10 justify-center
       items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
        <div className='p-5'>
          <img src={logo}  width="130px" alt='logo'></img>
        </div>

        <div className='shadow-2xl'> 
        <GoogleLogin text='signup_with'   cancel_on_tap_outside={true}
        // render = {(renderprops)=>(
        //   <button type='button' 
        //   //   onClick={renderprops.onClick}
        //   //  disabled={renderprops.disabled}
        //   >
            
        //     Sign in with Google
        //   </button>
        // )} 
        login_uri='/home' onSuccess={responsegoogle} onError={responsegoogle}  shape='circle' logo_alignment='center' >

        </GoogleLogin>
        </div>
       </div>
      </div>

      
      
      </div>
  )
}

export default Login