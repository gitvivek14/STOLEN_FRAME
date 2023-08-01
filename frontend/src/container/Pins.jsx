import React , {useState } from 'react'
import {Link , Route , Routes} from 'react-router-dom'
import {CreatePin,Feed,PinDetail,Search,NavBar} from '../components'

const Pins = ({user}) => {
  const[searchterm , setsearch] = useState('');
  return (
    <div className='px-2 md:mx-5'>
      <div className='bg-gray-50 '>
        <NavBar searchterm = {searchterm} 
        setsearch={setsearch} user={user&&user}></NavBar>
      </div>

      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed></Feed>}></Route>
          <Route path='/category/:categoryId' element={<Feed></Feed>}></Route>
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user&&user}></PinDetail>}></Route>
          <Route path='/create-pin' element={<CreatePin user={user&&user}></CreatePin>}></Route>
          <Route path='/search' element={<Search searchterm = {searchterm} 
        setsearch={setsearch}></Search>}></Route>
        </Routes>
      </div>

    </div>
  )
}

export default Pins