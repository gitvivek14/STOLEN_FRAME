import React from 'react'
import {Link , useNavigate} from 'react-router-dom'

import {IoMdAdd,IoMdSearch} from 'react-icons/io'

const NavBar = ({searchterm , setsearch , user}) => {

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear()
   window.location.reload(true)
  }

  // if(!user) return null;
  return (
    <div className='flex gap-2 md:gap-5w-full mt-5'>

      <div className='flex justify-start items-center w-full px-2 
      rounded-md bg-white border-none outline-none
       focus-within:shadow-md'>
        <IoMdSearch fontSize={21} className='ml-1'>
         
        </IoMdSearch>
        <input type='text' onChange={(e)=> setsearch(e.target.value)} placeholder='search' 
          value={searchterm} 
          onFocus={()=>navigate('/search')}
           className='p-2 w-full bg-white outline-none'></input>
       </div>

       <div className='flex gap-3'>
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
       
        </Link>
        <Link to='create-pin' className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 justify-center items-center flex '>
        <IoMdAdd></IoMdAdd>
        </Link>
        <button className='rounded-md flex items-center bg-black text-white w-20 justify-center' onClick={logout}>
          Log-Out
        </button>
       </div>

    </div>
  )
}

export default NavBar