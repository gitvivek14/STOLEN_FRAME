import React , {useEffect,useState} from 'react'



import { urlFor  ,client } from '../container/client'
import {Link,useNavigate, useParams} from 'react-router-dom'
import uuid from 'react-uuid'
import MasonryLayout from '../components/MasonryLayout'
import Spinner from './Spinner'

import {googleLogout} from '@react-oauth/google'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'


const UserProfile = () => {
  const [user, setuser] =  useState(null)
  const [pins, setpins] =  useState(null)
  const [text, settext] =  useState('created')
  const [active, setactive] =  useState('created')
  const activebtnstyles = 'bg-red-500 text-white font-bold rounded-full p-2 w-20 outline-none '
  const notactive = 'bg-primary  text-black mr-4 font-bold rounded-full p-2 w-20 outline-none '

  const navigate = useNavigate()
  const {userId} = useParams();
  {console.log(userId)}
  const randomimg = 'https://source.unsplash.com/1600x900/?nature,photography'

  useEffect(()=>{
    const query = userQuery(userId);

    client.fetch(query).then((data)=>{
      setuser(data[0]);
    })

  },[userId])

  useEffect(()=>{
    if(text==='created'){
      const createdpinQuery = userCreatedPinsQuery(userId)
      client.fetch(createdpinQuery).then((data)=>{
        setpins(data)
      })

    }else{
      const savedpinquery = userSavedPinsQuery(userId)
      client.fetch(savedpinquery).then((data)=>{
        setpins(data)
      })

    }

  },[text,userId] )
  const logout  = ()=>{
    localStorage.clear()
    navigate('/login')
  }
  {console.log(user)}
  if(!user) return  <Spinner message="Loading Profile"></Spinner>
  return (
    <div className='relative pb-2 h-4 justify-center items-center'>
      <div className='flex flex-col pb-5 '>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomimg} className='w-full h-370 2xl:h-510 shadow-lg object-cover' alt='banner'></img>
            <img src={user?.image} alt='user pic 'className='rounded-full w-20 h-20 object-cover -mt-20 shadow-xl bg-white'></img>
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.username}
            </h1>
            {/* <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && (
                <googleLogout OnSuccess={logout}></googleLogout>


              )}
            </div> */}
          </div>

          <div className='text-center mb-7'>
            <button type='button'
             onClick={(e)=>{settext(e.target.textContent); setactive('created')}}
             className={`${active==='created' ? activebtnstyles: notactive }`} >
              Created
             </button>
             <button type='button'
             onClick={(e)=>{settext(e.target.textContent); setactive('saved')}}
             className={`${active==='saved' ? activebtnstyles: notactive }`} >
              Saved
             </button>
          </div>
            {
              pins?.length ? (
                <div className='px-2 '>
                <MasonryLayout pins={pins}></MasonryLayout>
              </div>

              ) : (
                <div className='flex justify-center font-bold 
                items-center w-full text-xl mt-2'>No pins found!!</div>
              )
            }
         
        </div>
      </div>
    </div>
  )
}

export default UserProfile