import Cookies from 'js-cookie'
import { useState,useRef, useEffect } from 'react'
import store from 'store'
import utilApi from '../../resources/api/util_requests'
const CommunityForm = () => {
    const [users,setUsers]=useState([])
    const [user,setuUer]=useState(store.get('user'))
    const [selectedAdmins,setSelectedAdmins]=useState([])
    const [community,setCommunity]=useState({})
    const [filteredUsers,setFilteredUsers]=useState([])
     const selectRef=useRef('')
    function handleChange() {
    console.log('as')
}  
function handleSubmit()
{
    console.log('s')
}

// const handleChooseAdmin=()=>{
    const optionsElements= selectRef.current.selectedOptions
    
// }
    const handleClick=(e)=>{
        setSelectedAdmins(pre=>[...pre,e.target.textContent])
    }
    console.log(selectedAdmins)
    useEffect(()=>{
        async function getUsers(){
            const data=await utilApi.getFollowers(user._id)
            if(!data.success)
            return
            
            setUsers(data.followers)
        }
        getUsers()
    },[])
return (
      <>
      {users.length?
      <div style={{ background:'#ddd',height:'100vh' }} className="d-flex justify-content-center">

      {/* <div style={{borderRadius:'30px',background:'white',width:'50%',height:'80%'  }} className=" d-flex flex-column m-3 justify-content-between  align-items-center shadow  "> */}
      <form className='' >
    
        <div className="form-floating  ">
        <input onChange={handleChange} placeholder='first name' required type="text" className="form-control" name='communityName' id='first-name' />
        <label htmlFor="communityName">community name</label>
        </div>
        <div style={{ marginBlock:'20px' }} className="form-floating ">
            
        <textarea style={{ minWidth:'300px' ,minHeight:'300px'}} onChange={handleChange} placeholder='community describtion'  type="text" className="form-control" name='middleName' id='middleName' />
        <label htmlFor="communityDescrbtion">community describtion</label>
        </div>
        <div className="form-floating">

        <input onChange={handleChange} placeholder='first name' required type="text" className="form-control" name='communityName' id='first-name' />
        <label htmlFor="communityName">search followers</label>
        </div>
        <div style={{ display:filteredUsers.length?'block':'none' }} className="dropdown-menu">
  <a className="dropdown-item" href="#">Regular link</a>
  <a className="dropdown-item disabled" href="#">Disabled link</a>
  <a className="dropdown-item" href="#">Another link</a>
</div>

        </form>
        {/* </div> */}
      </div>:null
}
    </>
        )
      }
      

export default CommunityForm