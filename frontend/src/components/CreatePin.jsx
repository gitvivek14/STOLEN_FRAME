import React , {useState} from 'react'
import {MdDelete} from 'react-icons/md'

import {AiOutlineCloudUpload} from 'react-icons/ai'
import { client } from '../container/client'
import {useNavigate} from 'react-router-dom'

import Spinner from './Spinner'

import {categories} from '../utils/data'

const CreatePin = ({user}) => {
 const [title, settitle] = useState('')
 const [about, setabout] = useState('')
 const [destination, setdestination] = useState('')
 const [loading, setloading] = useState(false)
 const [fields, setfields] = useState(null)
 const [category, setcategory] = useState(null)
 const [imageAsset, setimageAsset] = useState(null)
 const [wrongImageType, setwrongImageType] = useState(null)

 const navigate = useNavigate();

 const uploadimage = (e)=>{
  const selectedFile = e.target.files[0];
  if(selectedFile.type==='image/png' ||selectedFile.type==='image/svg' || selectedFile.type==='image/gif '||selectedFile.type === 'image/jpeg'){
    setwrongImageType(false)
    setloading(true);
    client.assets
    .upload('image',selectedFile,{ contentType: selectedFile.type, filename: selectedFile.name })
    .then((doc)=> {
       setimageAsset(doc)
       setloading(false)
    }).catch((e)=>{
      console.log('imageuplaod',e)
    })
  }else{
    setwrongImageType(true)
    setloading(false)
  }
 }


 const savepin = ()=>{
  if(title && about && destination && imageAsset._id && category){
    const doc = {
      _type: 'pin',
      title,
      about,
      destination,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset?._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: 'postedBy',
        _ref: user._id,
      },
      category,
    };
    client.create(doc).then(()=>{
      navigate('/')
    });
  }else{
    setfields(true)
    setTimeout(
      () => {
        setfields(false);
      },
      2000,
    );

  }
 }
  return (
    <div className='flex  justify-center 
    items-center mt-5 lg:h-4/5 w-full max-w-max flex-col'>
      {
        fields && (
          <p className='text-red-500 mb-5 text-xl 
          transition-all duration-100 ease-in '>
            Please fill all the required field!
          </p>
        )
      }

      <div className='flex lg:flex-row flex-col justify-center
       items-center  lg:p-5 p-3 bg-white w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7
         w-full'>
          <div className='flex justify-center items-center flex-2
          border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner></Spinner>} 
            {wrongImageType && <p ><p>It&apos;s wrong file type.</p></p> }
            {!imageAsset ? (<label>
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex flex-col items-center justify-center'>
                  <p className='font-bold text-2xl'>
                    <AiOutlineCloudUpload ></AiOutlineCloudUpload>
                  </p>
                  <p className='text-lg'>Click to Upload</p>

                </div>

                <p className='mt-32 text-gray-400 '>
                  Recommendation : use high-quality JPG,SVG
                </p> 
              </div>
              <input type='file' name="upload-image" onChange={uploadimage} className='w-0 h-0' ></input>
              
            </label>) : (
              <div className='relative h-full'>
                <img src={imageAsset?.url}
                className='h-full w-full' alt='label'/>


                <button type='button' className='absolute b-3 r-3 p-3 rounded-full bg-white text-xl cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out' onClick={()=> setimageAsset(null)}>
                  <MdDelete></MdDelete>
                </button>
              </div>
            ) }
            </div>
         </div >

         <div className='flex flex-1 gap-6 lg:p-5 mt-5 w-full'>
          <input type='text' value={title} onChange={(e)=> settitle(e.target.value)}
           placeholder='add title'
            className='outline-none text-xl 
            sm:text-3xl font-bold border-b-2
             border-gray-200 p-2'></input>
             {user && (
              <div className='flex gap-2 my-2 items-center 
              rounded-lg'>
                <img src={user?.image} 
                className='w-10 h-10 rounded-full' alt='user-img'></img>
                <p className='font-bold'>{user?.username}</p>
              </div>
             )}

<input type='text' value={about} onChange={(e)=> setabout(e.target.value)}
           placeholder='add about'
            className='outline-none text-base
            sm:text-lg  border-b-2
             border-gray-200 p-2'></input>
             <input type='text' value={destination} onChange={(e)=> setdestination(e.target.value)}
           placeholder='add link'
            className='outline-none text-base
            sm:text-lg  border-b-2
             border-gray-200 p-2'></input>

             <div className='flex flex-col'>
              <div>
                <p className='mb- 2 font-semibold 
                text-lg sm:text-xl'>Choose Pin Category</p>
                <select onChange={(e)=>setcategory(e.target.value)}
                 className='outline-none w-4/5 text-base border-b-2
                  border-gray-200 rounded-md cursor-pointer '>
                    <option value="other" className='bg-white'>Select Category</option>
                    {categories.map((cat,i)=>(
                      <option className='text-base 
                      border-0 outline-none capitalize
                       bg-white text-black ' 
                       value={cat.name} key={i}>
                        {cat.name}
                       </option>
                    )
                    )}
                  </select>
              </div>

              <div className='flex justify-end items-end mt-5'>
                <button onClick={savepin} type='button' className='bg-red-500 text-white 
                font-bold p-2 rounded-full w-28 outline-none'>
                  Save Pin
                </button>
              </div>
             </div>

         </div> 
       </div>
    </div>
  )
}

export default CreatePin