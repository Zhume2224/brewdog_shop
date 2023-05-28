import React from "react";
import {Link} from "react-router-dom"

const NavBar=()=>{
return (
    <>
    <ul className="navbar">
    <li className="navItem">
        <Link to="/">Home</Link>
    </li>
    <li className="navItem">
        <Link to="randomBeer">Surprise Me</Link>
    </li>
    <li className="navItem">
        <Link to="/filterBeer">Help Me</Link>
    </li>
    <li className="navItem">
        <Link to="/basket">Basket</Link>
    </li>
  </ul>

 </>
)

}

export default NavBar