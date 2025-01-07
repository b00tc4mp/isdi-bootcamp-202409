import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation({ to, children }) {
    return <NavLink to={to} children={children} className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-blue-200 dark:text-blue-400' : 'text-white dark:text-gray-300'}`} />
}