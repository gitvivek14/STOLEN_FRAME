import React , {useState} from 'react'
import { urlFor  ,client } from '../container/client'
import {Link,useNavigate} from 'react-router-dom'
import uuid from 'react-uuid'
import {MdDownload} from 'react-icons/md'
import {BsArrowUpCircleFill} from 'react-icons/bs'
import {AiTwotoneDelete} from 'react-icons/ai'

const Pin = ({pin}) => {
    const user = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    const[hover,setpinhover] = useState(false);
    const [savepost, setsavepost] = useState(false);
    const { postedBy, image, _id, destination } = pin;
   

    // 1 , [2,3,1] -> [1]
    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const savepin = ((id)=>{
    if(alreadySaved?.length===0){
        setsavepost(true);

        client.patch(id).setIfMissing({save:[]}).insert('after','save[-1]',[{
            _key:uuid(),
            userId:user.aud,
            postedBy:{
                _type:'postedBy',
                _ref:`${user.aud}`
            },
        }])
        .commit()
        .then(()=>{
            window.location.reload();
            setsavepost(false)
        })
    }
})

const deletepin = ((id)=>{
    client.delete(id).then(()=>{
        window.location.reload()
    })

})
    const navigate = useNavigate()
  return (    <div className='m-2'>
        <div onMouseEnter={()=> setpinhover(true)}  
        onMouseLeave={()=> setpinhover(false)}  onClick={()=> navigate(`/pin-detail/${_id}`)} className='relative
        cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-75 ease-in-out'>
         {image && (
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> )}
        {console.log(hover)}
        {hover && (
            <div className='absolute top-0 w-full h-full flex
             flex-col justify-between p-1 pr-2 pb-2 z-50 pt-2' style={{height:'100%'}}>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <a href={`${image?.asset?.url}dl=`}download className='bg-white h-9 w-9 rounded-full justify-center items-center 
                        flex opacity-75 text-xl hover:opacity-100 hover:shadow-md outline-none' onClick={(e)=> e.stopPropagation()}>
                            <MdDownload></MdDownload>
                        </a>
                    </div>
                    {
                        alreadySaved?.length !==0 ?  
                        (<button type='button' className='bg-red-500 
                        opacity-70 hover:opacity-100 px-5 py-1 text-base rounded-3xl
                        hover:shadow-md outline-none'> {pin?.save?.length} Saved</button>)
                        :
                         (
                            <button type='button' className='bg-red-500 
                            opacity-70 hover:opacity-100 px-5 py-1 text-base rounded-3xl
                            hover:shadow-md outline-none' onClick={(e)=>{
                                e.stopPropagation();
                                savepin(_id);
                            }}>
                                {pin?.save?.length} {savepost ? 'Saving' : 'Save'}
                                </button>
                        )
                    }

                </div>

                <div className='flex justify-between items-center gap-2 w-full p-2 '>
                    {
                        destination && (
                            <a href={destination} target='_blank' rel='noreferror' className='
                            bg-white flex gap-2 text-black font-bold 
                            p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 
                            hover:shadow-md items-center '>
                                <BsArrowUpCircleFill></BsArrowUpCircleFill>
                                {destination.slice(8,17)}
                            </a>

                        )
                    }
                    {postedBy?._id === user.iat && (
                        <button type='button' className='bg-white text-black 
                        opacity-70 hover:opacity-100 px-5 py-1 text-base rounded-3xl
                        hover:shadow-md outline-none z-50' onClick={(e)=>{
                            e.stopPropagation();
                            deletepin(_id);
                        }}>
                            <AiTwotoneDelete></AiTwotoneDelete>

                        </button>
                    )}
                </div>

             </div>
        )}
        </div>
        <Link to={`/user-profile/${postedBy?._id}`}
         className='
        flex gap-2 mt-2 items-center'>
            <img className='w-8 h-8 rounded-full
             object-cover  ' src={postedBy?.image}></img>
             <p className='font-semibold capitalize text-black'
             >{postedBy?.username}</p>
        </Link>
    </div>
  )
}

export default Pin