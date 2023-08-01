
import React , {useEffect,useState} from 'react'

import {AiOutlineCloudUpload} from 'react-icons/ai'
import { urlFor  ,client } from '../container/client'


import MasonryLayout from '../components/MasonryLayout'
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'

const Search = ({searchterm}) => {

  const [pins, setpins] =  useState(null)
  const [load, setload] =  useState(false) 

  useEffect(()=>{
    if(searchterm){
      setload(true)
      const query = searchQuery(searchterm.toLowerCase())
      client.fetch(query).then((data)=>{
        setpins(data);
        setload(false)
      })

    }else{
      client.fetch(feedQuery).then((data)=>{
        setpins(data);
        setload(false)
      })
    }

  },[searchterm])
  return (
    <div>
      {
        load && <Spinner message="Searching for Pins"></Spinner>
    
      }

      {
        pins?.length!==0 && <MasonryLayout pins={pins}></MasonryLayout>
      }
      {
        pins?.length ===0 && searchterm !=='' && !load && (
          <div className='mt-10 text-center text-xl'>No Pins found</div>
        )
      }

    </div>
  )
}

export default Search