import React from 'react'
import store from 'store';
import communityApi from '../../resources/api/community_requests';
import utilApi from '../../resources/api/util_requests';
import { useState,useRef,useEffect } from 'react'
import userAPI from '../../resources/api/user_requests';
import { Link, useParams } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {useLocation,NavLink,Outlet, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import OverLay from '../Overlay/OverLay';
const NavBar = () => {
  const navigate=useNavigate()
  const [removedAdmins,setRemovedAdmins]=useState([])
  const [chosenAdmins,setChosenAdmins]=useState([])
  const [addListFlage,setAddListFlage]=useState(false)
  const [removeListFlage,setRemoveListFlage]=useState(false)
  const [followers,setFollowers]=useState([])
  const [followes,setFollowes]=useState([])
  const [results,setResults]=useState([])
  const [searchQuery,setSearchQuery]=useState()
  const [dropListFlage,setDropListFlage]=useState(false)
  const [communityName,setCommunityName]=useState('')
  const [community,setCommunity]=useState({_id:''})
  const communityPublicityRef=useRef()
  const postApproval=useRef()
  let location=useLocation()
  let searchRef=useRef('')
  const params=useParams()
  
  useEffect(()=>{
    params.communityId&&communityApi.getCommunity(params.communityId).then(data=>setCommunity(data.community)).catch(err=>console.log(err))
  },[location])
  async function handleSearch(e)
  {
    e.preventDefault()
    const results=await userAPI.searchQeury(searchQeury)
   
  }
  async function changePublicity(e){
    const data=await communityApi.changePublicity(params.communityId)
    setCommunity(data.community)
  }
  async function changePostApproval(e){
    
  console.log(e.target.checked)
    const data=await communityApi.changePostApproval(params.communityId)
    setCommunity(data.community)
   } 
 function handleClickMember(e,memberId){
  if(e.target.classList.some(name=>name==='manager-item'))
  return 
    if(e.target.classList.some(name=>name==='admin-item'))
        setRemovedAdmins(pre=>[... pre,memberId])

}
return (<>

<StickyBox className='sticky-nav' style={{ top:'0px',zIndex:'99999999'}}  >


<nav className=" shadow navbar position-relative navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="  navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a  className="nav-link">

            <Link to='/' >Home</Link>
          </a>
        </li>
        <li className="nav-item">
        <a  className="nav-link">
          <Link to={`/user/${store.get('userId')}`} >your page</Link>
        </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">

            <Link to={'/logout'} >log out</Link>
          </a>
                  </li>
         <hr />
         <li style={{ maxWidth:'300px' }} onClick={()=>setDropListFlage(pre=>!pre)} className='nav-link font-weight-bold'>communities</li>
         {dropListFlage&&<ul style={{ maxWidth:'300px' }} class="list-group">
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
  <hr />
  <li onClick={()=>navigate('/create-community')} class="list-group-item">create community</li>
</ul>}
                  
      </ul>
      <hr />
      {community._id&&store.get('user').managedCommunities.some(id=>id===params.communityId)?<><div className="mt-4 d-flex flex-row flex-wrap justify-content-evenly community-options">
            <div className="dropdown position-relative">

                <button onClick={()=>setAddListFlage(pre=>!pre)} className='btn m-1 btn-primary m-0'>update admins</button>
                {addListFlage?<div style={{zIndex:'99999999999999999' ,background:'white',top:'30px',left:'0',width:'',height:'' }} className=" position-absolute " aria-labelledby="dropdownMenuButton">
                <ul style={{ width:'100%' }} className="list-group">
            {community.members.map(({memberId})=><li  onClick={(e)=>handleClickMember(e,memberId)}   style={{ width:'100%'}} className={`member list-group-item ${community.manager._id===memberId._id&&'manager-item'} ${community.admins.some(({_id})=>_id===memberId._id)&&'admin-item'} ${chosenAdmins.some(id=>id===memberId._id)&&'chosen-admin-item'} ${removedAdmins.some(({_id})=>_id===memberId._id)&&'removed-admin-item'}`}>
                   {`${memberId.firstName} ${memberId.lastName}`}
            </li>)}
</ul>
  </div>:null}
            </div>
                <button onClick={()=>setRemoveListFlage(pre=>!pre)} className='btn m-1 btn-warning m-0'>remove admins</button>
                <button className='btn m-1 btn-danger m-0'>resign</button>
                <button className='btn m-1 btn-danger m-0'>remove group</button>
            
              </div>
      <div style={{ marginLeft:'' }} className="mt-4 d-flex flex-row flex-wrap justify-content-start community-options">
      <div   className="form-check form-switch">
  <input style={{  }} checked={community.public} onChange={changePublicity} className="form-check-input" type="checkbox" role="switch" id="communityPublicity"/>
  <label className="form-check-label"  htmlFor="communityPublicity">community publicity</label>
</div>
              </div>
      <div style={{ marginLeft:'' }} className="mt-4 d-flex flex-row flex-wrap justify-content-start community-options">
      <div   className="form-check form-switch">
  <input style={{  }}  className="form-check-input" onChange={changePostApproval} type="checkbox" checked={community.postApproval} role="switch" id="postApproval"/>
  <label className="form-check-label" htmlFor="postApproval">post approval</label>
</div>
              </div>
              </>:null}
      <form style={{}} className="d-flex position-relative">
        <input ref={searchRef} onChange={(e)=>{setSearchQuery(e.target.value)
        if(e.target.value==='')
        setResults([])
        if(e.target.value){
          
          let users=store.get('users')
          if(users.length){
            users=users.filter(user=>{
              let fullName=`${user.firstName} ${user.lastName}`
              if(fullName.includes(e.target.value))
              return true
            })
          }
          let communities=store.get('communities')||[]
          if(communities.length){

            communities= communities.filter(community=>community.communityName.includes(e.target.value))

          }
          setResults({users:[... users],communities:[... communities]})
          console.log(results)
        }
        
        }} className="form-control me-2" type="search" placeholder="Search" id='searcgQuery' aria-label="Search"/>

        <button onClick={async(e)=>  {
          e.preventDefault()
          const data= await userAPI.searchQuery(searchQuery)
          console.log(data) 
          setResults(data.results)
}} className="btn btn-outline-success" type="submit">Search</button>

        {Object.keys(results).length?<div onClick={()=>{setResults({})
      searchRef.current.value=''
      }} style={{ top:'90px',minWidth:'200px',width:'30vw',maxWidth:'400px' }} className="list-container position-absolute  left-0">
          <ul className='list-group positoin-absolute' >
              <>
              <>
              {

                results.users.map((user,i)=>{
                  return  <li key={i} className='list-group-item'>
                        <a href="#" className=" text-dark list-group-item list-group-item-action">
                            <Link to={`user/${user.id}`} >
                               <h4 className='text-dark'>
                                 {user.firstName}  {user.lastName}
                               </h4>
                            </Link>
                        </a>

                    </li>
                    
                  })
                }
              </>                
              <>
              {
                
                results.communities.map((community,i)=>{
                  return  <li key={i} className='list-group-item'>
                        <a href="#" className=" text-dark list-group-item list-group-item-action">
                            <Link to={`user/${user.id}`} >
                               <h4 className='text-dark'>
                                 {community.communityName}
                               </h4>
                            </Link>
                        </a>

                    </li>
                    
                  })
              }
              </>  
              </>
          </ul>

        </div>:null}
      </form>
    </div>
              
  </div>
</nav>


    </StickyBox>
<Outlet/>

</>
    )
}

export default NavBar