import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {RiHome6Fill} from 'react-icons/ri'
import {IoMdArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'

import {categories} from '../utils/data'

const isnotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({user,closetoggle}) => {
  const handleclosesidebar=()=>{
    if(closetoggle){
      closetoggle(false)
    }
  }

// const categories = [
//   {
//     name:'Animals',
    
//   },
//   {
//     name:'Photography',
    
//   },
//   {
//     name:'Gaming',
    
//   },
//   {
//     name:'Coding',
    
//   }
// ]


  return (
    <div className='flex flex-col justify-between 
     bg-white overflow-y-scroll min-w-210 h-full
     hide-scrollbar '>
      <div className='flex flex-col'>
        <Link to="/" className='flex px-5 gap-2 my-6 pt-1 w-190
         items-center' onClick={handleclosesidebar}>
          <img  src={logo} className='w-full'></img>
         </Link>

         <div className='flex flex-col gap-5'>
          <NavLink to="/" className={({isActive})=> isActive? isActiveStyle : isnotActiveStyle} onClick={handleclosesidebar}>
          <RiHome6Fill>
            </RiHome6Fill>

          Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 
          2xl:text-xl '>Discover Categories</h3>

          {
            categories.slice(0,categories.length-1).map((category)=>(

              <NavLink to={`/category/${category.name}`} 
              className={({isActive})=> isActive? isActiveStyle : isnotActiveStyle} 
              onClick={handleclosesidebar} key={category.name}
              >
                <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt='category'></img>
                {category.name}

              </NavLink>
            ))
          }

          
          
         </div>


      </div>
      {
        user && (<Link to={`user-profile/${user._id}`}
         className='flex my-5
         mb-3 gap-2 items-center px-5
          bg-amber-400 rounded-lg shadow-lg mx-3 ' 
          onClick={handleclosesidebar}>
            <div className='flex items-center justify-center rounded-full gap-2'>
              <div className='rounded-full bg-white'>
              <img src={user.image} className='w-10 h-10 roudned-full' 
          alt='userprofile'>
          </img>
              </div>
          
          <p>{user.username}</p>
            </div>
          

         </Link>)
      }
    </div>
  )
}

export default Sidebar