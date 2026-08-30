import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink , useNavigate} from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu , setShowMenu] = useState(false)
  const [token , setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=> navigate('/')} className="w-44 cursor-pointer "src={assets.logo} alt="" />
        <ul className='hidden md:flex items-start gap-5  font-medium '> {/* here we are hiding it for the small screens */}
          <NavLink to="/">  
            <li>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden '/>
          </NavLink>
           <NavLink to="/doctors">
            <li>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
           <NavLink to="/about">
            <li>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
           <NavLink to="/contact">
            <li>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
        </ul>
        <div className="flex item-center gap-4">

          {
            token 
            /* if tokenised means login then this otherwise button is visible */
            ? <div className="flex items-center gap-2 cursor-pointer group relative">
               <img className="w-8 rounded-full"src={assets.profile_pic} alt="" /> 
               <img className="w-2.5 "src={assets.dropdown_icon} alt="" />
              {/* absolute: Positions the element relative to its nearest positioned parent. and we used relative in parent 
              because absolute ignores all layout rules and push the things in the top - left , so relative is used to control that 
              and make absolute working with other layout . hidden: is hiding the drop down normally .
              group-hover:block: Displays the element (display: block) only when the parent element with the class group is hovered
              z-20: it controls the stack as when we hover things our drop down is in stack form.*/}
               <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={()=> navigate('/my-profile')} className="hover:text-black cursor-pointer ">My Profile</p>
                  <p onClick={()=> navigate('/my-appointments')} className="hover:text-black cursor-pointer ">My Appointments</p>
                  <p onClick={()=> setToken(false)} className="hover:text-black cursor-pointer ">Logout</p>
                  {/* initially it said as login but when we clicked on logout it 
                  logged out and setToken state to false*/}
                    
                  </div>
                </div>
                </div>
                /* on medium and above it is visible as block is used other then that it will be hidden */
            :<button onClick={()=>navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden  md:block " > Create Account</button>
          }
          <img onClick={()=>setShowMenu(true)}className="w-6 md:hidden"src={assets.menu_icon} alt="" />
          {/* So it is about menu icon visible , when it smaller than medium */ }
          {/*-------------------Mobile View--------------------*/} 
          <div className={` ${showMenu ? 'fixed inset-0 w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
            {/* It is about  when does menu is visible in the small screen , if our setShow menu is true then menu bar is visible and when it clicked it covered the whole page and 
          if setShowMenu is false then it is collapsed until it completely removed */}
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="" />
              <img className="w-7" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
              {/* here setShowMenu(contains  false as when the 
              user clicked X OR any other option like  doctors , about and other menu options , user reaches new page and the menu is 
              automatically closed that's why it is false . */}
            </div>
            <ul className="flex flex-col items-center gap2 mt-5 px-5 text-lg  font-medium">
              <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className="px-4 py-2 rounded  inline-block">HOME</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className="px-4 py-2 rounded  inline-block">ALL DOCTORS</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className="px-4 py-2 rounded  inline-block">ABOUT</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className="px-4 py-2 rounded  inline-block">CONTACT</p></NavLink>
            </ul>
          </div>
{/* at first it is dedicated to mobile phone then we applied the md:block which means must visible for medium and large. */}
        </div>
    </div>
  )
}

export default Navbar