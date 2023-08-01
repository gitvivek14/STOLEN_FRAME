import React , {useRef,useState,useEffect}from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link , Route , Routes} from 'react-router-dom'
// import Sidebar from '../components/Sidebar'
// import UserProfile from '../components/UserProfile'
import {Login,Sidebar, UserProfile} from '../components';
import {client} from '../container/client'
import logo from '../assets/logo.png'
import Pins from './Pins';
import {userQuery} from '../utils/data'



const Home = () => {
  const[toggle,settoggle] = useState(false);
  const[user,setUser] = useState();

  const scrollref = useRef(null)

  const userInfo = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
{console.log(userInfo)}
  useEffect(()=>{
    const query = userQuery(userInfo?.aud);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      
    })


  
   


  },[])
  useEffect(()=>{
    scrollref.current.scrollTo(0,0);


  },[])
  return (
    <div className='flex bg-gray-50 md:flex-row 
    flex-col h-screen transition-height duration-75 ease-out '>
      <div className='hidden md:flex h-screen flex-initial'>
        
        <Sidebar user={user && user}></Sidebar>
        
      </div>

      <div className='md:hidden flex flex-row  '>
        <div className='p-2 w-full flex flex-row shadow-md justify-between items-center'>
        <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>settoggle(true)}></HiMenu>
        <Link to="/">
          <img src={logo} className='w-28'></img>
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} className='w-28'></img>
        </Link>
        </div>
        
        {toggle &&(
          <div className='fixed w-4/5 bg-white 
          h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex items-center justify-end p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=> settoggle(false)}></AiFillCloseCircle>
            </div>
           
            <Sidebar  user={user && user} closetoggle={settoggle}></Sidebar>
          </div>
        )}
        </div>

      

        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollref}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile/>}></Route> 
            <Route path='/*' element={<Pins user={user&&user}></Pins>}></Route> 
          </Routes>
        </div>


       
    </div>
  )
}

export default Home