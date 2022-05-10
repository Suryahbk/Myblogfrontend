// import { useEffect, useState } from 'react'
import  './sidebar.css'
// import { Link } from 'react-router-dom';
// import axios from "axios"

export default function Sidebar() {
  // const [cats,setCats] = useState([]);

  // useEffect(()=>{
  //     const getCats = async()=>{
  //       const res = await axios.get("/categories")
  //       setCats(res.data)
  //     }
  //     getCats();
  // },[])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        {/* <span className="sidebarTitle">ABOUT ME</span> */}
        <img
          src="data:image/png;base64,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"
          alt=""
        />
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem expedita minima iure minus deleniti rerum temporibus unde.
        </p>
      </div>
      {/* <div className="sidebarItem">
      <span className="sidebarTitle">CATEGORIES</span>
       <ul className="sidebarList">
        {cats.map(c =>(
          <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
        <li className="sidebarListItem" >{c.name} </li>
      </Link>  ))}
      </ul> 
      </div> */}
    </div>
  )
}
