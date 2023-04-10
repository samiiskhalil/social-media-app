import { useRef,useState,useEffect } from 'react'
import postApi from '../../resources/api/post_requests'
import store from 'store'
import { useParams,Navigate} from 'react-router'
const MakePost = ({user,communityId,sharedPostId}) => {
    const params=useParams()
    const [image,setImage]=useState()
    const [imageSrc,setImageSrc]=useState('')
    const [post,setPost]=useState({
        describtion:'',
        image:null,
        communityId:communityId||null,
        sharedPostId:sharedPostId||null
    })
    const imageRef=useRef('')
    const textRef=useRef('')
    async function handleMakePost(){
        console.log('a')
    const data=await postApi.makePost(post)
      if(!data.success)
      // throw err
      console.log('a')
      textRef.current.value=''  
      imageRef.current.value=''  
      setImageSrc('')
    }
  

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'file' ? target.files[0] : target.value;
    
        setPost((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    return (
    <div className="row">
        <div className="col card p-3 shadow pd d-flex justify-content-center flex-column align-items-start">
        <h3>make a post now </h3>
        <p>what are you thinking ? </p>
        <textarea ref={textRef} onChange={handleChange} name='describtion' style={{ width:'100%'}} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        <input ref={imageRef}
         name='image' onChange={(e)=>{
                setImage(e.target.files[0])
                let url= URL.createObjectURL(e.target.files[0])
                let arr=url.split('/')
                // setImageSrc(arr[arr.length-1])
                setImageSrc(url)
                handleChange(e)

            } }className="form-control" 
       type="file" accept='*image /.mp4' multiple></input>
       <div style={{ width:'80%',height:'400px' }} className="">

        <img className='mt-3 object-fit-cover'  style={{ objectFit:'contain',width:'100%',height:'100%' }}  src={imageSrc} alt="image" />
       </div>
       <button onClick={handleMakePost} className='btn-primary btn'>submit</button>
        </div>
    </div>
    )
}

export default MakePost