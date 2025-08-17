import "./navbar.css"
import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

 export const Navbar=()=>{

    const {user,dispatch}=useContext(AuthContext)
    const Logout= (e) => {
    
        e.preventDefault();
         try{
          dispatch({ type: 'LOG_OUT' });
         }catch(err){
          console.log(err);
         }
      }

    return(
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">&nbsp;</span>
                </Link>
                
                {user ? (
                <>
                <div className="navItems">
                    <span className="username">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span>
                    
                 <button className="logout" onClick={(e)=>{Logout(e)}}   style={{padding:7 ,margin:15}}>Logout</button>
                 </div>
                 </>
                 ) : (
                <div className="navItems">
                 <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                  <button className="navButton">Register</button>
                </Link>
                 <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                  <button className="navButton">Login</button>
                 </Link>
                 </div>
                )}

            </div>
        </div>
    )
}
