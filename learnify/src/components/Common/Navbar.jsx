import React from 'react'
import { Link, matchPath, Navigate } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const location = useLocation();

    const {token} =useSelector((state)=>state.auth);
    const {user} =useSelector((state)=>state.profile);
    const {totalItems} =useSelector((state)=>state.cart);
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

            <div className='w-11/12 max-w-maxContent flex items-center justify-between'>
                <div>
                    <Link to="/">
                        <img src={logo} width={160} height={42} alt="logo" />
                    </Link>
                </div>

                {/* nav Links */}
                <div>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}
                                        className=''

                                    >{link.title === "Catalog" ? (<div>hello</div>) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25 " : " text-richblack-25 "}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}</li>
                                )
                            })
                        }

                    </ul>

                </div>

                {/* Login /Signup/button */}
                <div className='flex gap-x-4 items-center'>
                    <Link>btn</Link>
                    <Link>btn2</Link>
                </div>



            </div>
        </div>
    )
}

export default Navbar