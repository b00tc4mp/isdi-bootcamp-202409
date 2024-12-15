import React, { useEffect, useState } from 'react'
import assets from '../assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, isUserRoleModerator, logoutUser } from '../logic/users/index'
import logic from '../logic/index';


export default function NavBar() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [isModerator, setIsModerator] = useState(false)
    const [cartItemCount, setCartItemCount] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = isUserLoggedIn()

        setLoggedIn(loggedIn);

        setIsModerator(loggedIn && isUserRoleModerator())

        const cart = async () => {
            if (!loggedIn) {
                return
            }
            else {
                try {
                    const cartInfo = await logic.getCart()

                    setCartItemCount(cartInfo.items.length)

                } catch (error) {
                    console.error(error)
                }
            }
        }
        cart()
    }, [loggedIn])



    const handleLogout = () => {
        logoutUser();
        setLoggedIn(false)
        setCartItemCount(0)
        navigate('/')
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to={'/'}>
                <img src={assets.logoBuenardo} className='w-40 h-4/6' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-white'>
                <NavLink to='/' className={'flex flex-col items-center gap-1  hover:text-green-700'}>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                <NavLink to='/products' className={'flex flex-col items-center gap-1 hover:text-green-700'}>
                    <p>PRODUCTS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                <NavLink to='/about' className={'flex flex-col items-center gap-1  hover:text-green-700'}>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className={'flex flex-col items-center gap-1  hover:text-green-700'}>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                {isModerator && (
                    <NavLink to='/admin' className={'flex flex-col items-center gap-1 hover:text-green-700'}>
                        <p>ADMIN DASHBOARD</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                    </NavLink>
                )}

            </ul>
            <div className='flex items-center gap-6'>
                <img src={assets.searchIcon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                    {loggedIn ? (
                        <>
                            <img src={assets.profileIcon} className='w-5 cursor-pointer' alt="" />

                            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 transition-all duration-400 ease-in-out z-50'>
                                <div className='flex flex-col gap-2 w-36 py-3 px-5 border-solid border-2 bg-black border-green-700 text-white '>
                                    <NavLink to='/userProfile'>
                                        <p className='cursor-pointer hover:text-green-700'>My Profile</p>
                                    </NavLink>
                                    <NavLink to='/orders'>
                                        <p className='cursor-pointer hover:text-green-700'>Orders</p>
                                    </NavLink>
                                    <p onClick={
                                        handleLogout
                                    } className='cursor-pointer hover:text-green-700'>Logout</p>
                                </div>
                            </div>
                        </>
                    ) : (<Link to='/login'>
                        <img src={assets.profileIcon} className='w-5 cursor-pointer' alt="" />
                    </Link>
                    )}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cartIcon} className='w-5 cursor-pointer' alt="" />
                    <p className='absolute right-[-9px] bottom-[-11px] w-5 text-center leading-4 bg-black text-white aspect-square rounded-full border-solid border-[1px] border-green-700 text[6px] '>{cartItemCount}</p>
                </Link>
                <img src={assets.menuIcon} className='w-5 cursor-pointer ' alt="" />
            </div>
        </div>
    )
}

