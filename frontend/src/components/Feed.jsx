import React , {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

// import {client} from '../container/client'

import {client} from '../container/client'

import MasonryLayout from './MasonryLayout'
import  Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'


const Feed = () => {
  const [pins, setPins] = useState();
  const[load,setload] = useState(true);
  const {categoryId} = useParams();

  useEffect(()=>{
    if(categoryId){
      const query = searchQuery(categoryId)
      client.fetch(query).then((data)=>{
        setPins(data)
        setload(false)
      }
      );

    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data);
        setload(false)
      })
      
    }
   
  },[categoryId])
  if(load) return <Spinner message = "we are adding new to your feeds"> </Spinner>

  if(!pins?.length) return <h2 className='flex justify-center items-center text-3xl w-full mt-10 translate-y-[50%]'>No Pins Available..</h2>
  return (
 
      <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
   
  )
}

export default Feed 