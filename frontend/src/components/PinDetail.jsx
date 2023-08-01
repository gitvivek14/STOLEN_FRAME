import React , {useState,useEffect} from 'react'
import {MdDownload} from 'react-icons/md'
import {Link,useParams} from 'react-router-dom'
import uuid from 'react-uuid'
import {client,urlFor} from '../container/client'
import Masonry from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'


const PinDetail = ({user}) => {
  const [Pins, setPins] = useState()
  const [pinDetails, setpinDetails] = useState()

  const [comment, setComment] = useState('')
  const [adding, setadding] = useState(false)

  // id........
  const {pinId} = useParams();



  


  const fetchpindetails = ()=>{
   let query = pinDetailQuery(pinId);
    if(query){
      client.fetch(query).then((data)=>{
        setpinDetails(data[0]);

        if(data[0]){
          query =pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res)=>{
            setPins(res);
          })
        }
      })
    }
  }
useEffect(()=>{
  fetchpindetails();
},[pinId])

if(!pinDetails) return <Spinner message="Loading pin ....."></Spinner>

const addcomment = ()=>{
  if(comment){
    setadding(true)

    client.patch(pinId)
    .setIfMissing({comments:[]})
    .insert('after' , 'comments[-1]' 
    ,[{comment , _key:uuid() ,
      postedBy:{
        _type:'postedBy',
        _ref:user._id
      }

     
    }] )
    .commit()
    .then(()=>{
      fetchpindetails();
      setComment('') 
      setadding(false)
    })
  }
}
  

  return (
    <>
    <div className='flex xl:flex-row flex-col m-auto bg-white' style={{maxWidth:'1500px' , borderRadius:'32px'}}>
      <div className='flex justify-center items-center
      md:items-start flex-initial'>
        <img src={pinDetails?.image && urlFor(pinDetails.image).url()}
        className='rounded-t-3xl rounded-b-lg' alt='user-post'></img>
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620  '>
        <div className='flex items-center justify-between '>
          <div className='flex gap-2 items-center'>
          <a href={`${pinDetails.image?.asset?.url}dl=`}download className='bg-white h-9 w-9 rounded-full justify-center items-center 
                        flex opacity-75 text-xl hover:opacity-100 hover:shadow-md outline-none' onClick={(e)=> e.stopPropagation()}>
                            <MdDownload></MdDownload>
                        </a>
          </div>
          <a href={pinDetails.destination} target='blank' rel='noreferrer'>
            {}
          </a>

        </div>

        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetails?.title}
          </h1>

          <p className='mt-3 '>{pinDetails?.about}</p>
        </div>
        <Link to={`/user-profile/${pinDetails.postedBy?._id}`}
         className='
        flex gap-2 mt-5 items-center bg-white rounded-lg'>
            <img className='w-8 h-8 rounded-full
             object-cover  ' src={pinDetails.postedBy?.image}></img>
             <p className='font-semibold capitalize text-black'
             >{pinDetails.postedBy?.username}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto '>
          {pinDetails?.comments?.map((comment,i)=>(
            <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
              <img src={comment.postedBy.image} alt='user-profile' className='w-10 h-10 
              rounded-full cursor-pointer'></img>
              <div className='flex flex-col'>
                <p className='font-bold'>{comment.postedBy.username}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          )


          )}

        </div>

        <div className='flex flex-wrap mt-6 gap-3'>
        <Link to={`/user-profile/${pinDetails.postedBy?._id}`}
         >
            <img className='w-8 h-8 rounded-full
             cursor-pointer ' src={pinDetails.postedBy?.image}></img>
            
        </Link>
        <input className='flex flex-1 border-gray-100 outline-none 
        border-2 p-2 rounded-2xl
         focus:border-gray-300' placeholder='add a comment'
          type='text' value={comment} 
          onChange={(e)=> setComment(e.target.value)}>

          </input>
          <button type='button' 
          className='bg-red-500 text-white rounded-full 
          px-6 py-2 font-semibold text-bold outline-none' onClick={addcomment}>
            {adding ? 'posting the comment' : 'Posted' }
            
          </button>

        </div>
      </div>

    </div>
    {Pins?.length>0 ?  (
      <>
      <h2 className='text-center text-2xl mb-4 mt-8 '>More Like this</h2>
      <MasonryLayout pins={Pins}></MasonryLayout>
      </>
    ): (<Spinner message="Loading more pins"></Spinner>)}
    </>
  )
}



export default PinDetail