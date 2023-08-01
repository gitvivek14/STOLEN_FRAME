import React from 'react'
import {FidgetSpinner} from 'react-loader-spinner'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center
    items-center'>
      {/* <Loader type="Circles" color="#00BFF" height={50}
       width={200} className="m-5" >
       </Loader> */}
       <FidgetSpinner
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#ff0000', '#00ff00', '#0000ff']}
  backgroundColor="#F4442E"
/>
       <p className='text-lg text-center px-2'>
        {message}
       </p>
    </div>
  )
}

export default Spinner