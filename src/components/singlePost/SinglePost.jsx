import {useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  './singlePost.css';
import {Context} from "../../context/Context";
import axios from "axios";

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split("/")[2]; // splitting the pathname and [2] is post id.
  const [post,setPost]= useState({})
  const {user} = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [updateMode,setUpdateMode] = useState(false);

  useEffect(()=>{
    const getPost = async ()=>{
      const res =await  axios.get("/posts/"+ path) // fetching posts from api backend + path id(9).
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  },[path]) //whenever this path changes update this useeffect. 

const handleDelete= async ()=>{
  try{
  await axios.delete(`/posts/${post._id}` , {data:{username:user.username}}); // if user===user.username is same, then the post is deleted and return to home.
  window.location.replace("/"); 
}catch(err){}
}


const handleUpdate=async ()=>{
  try{
    await axios.put(`/posts/${post._id}` , {username:user.username,title, desc,}); // if user===user.username is same, then setupdate mode is on where u can update the title,desc.
    setUpdateMode(false)
  }catch(err){
    console.log(err)
  }
}

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
          {post.photo && (
            <img src={PF + post.photo}
             alt=""
              className="singlePostImg" 
              />
       ) }{
         updateMode ? <input type="text" value={title} className="singlePostTitleInput" onChange={(e)=>setTitle(e.target.value)} autoFocus /> :(
        <h1 className="singlePostTitle">{title}
        {post.username === user?.username && (
        <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
          </div>
          )}
          </h1>
          )
       }
          <div className="singlePostInfo">
              <span className='singlePostAuthor'>Author:
              <Link to={`/?user=${post.username}`} className="link"> {/*post is identified and who authored it. */}
               <b>{post.username}</b>
               </Link>
               </span>
              <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> :(
          <p className="singlePostDesc">
       {desc}
        </p>
        )}{updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
       )} 
       </div>
        </div>
  )
}
