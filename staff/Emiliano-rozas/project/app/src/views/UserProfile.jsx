import React, { useState } from 'react'
import { SideBar, UserInfo } from '../components'

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('profile') // con esto controlamos las vistas

    return (
        <div className="flex w-full">
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-white text-base">
                {activeTab === 'profile' && <UserInfo />}
                {activeTab === 'favorites' && <div ><img className="w-full  rounded" src="
                https://hips.hearstapps.com/hmg-prod/images/thumb-1920-892817-1567104591.jpg" alt="" /></div>}
                {activeTab === 'reviews' && < div > <img className="w-full  rounded" src="
                https://hips.hearstapps.com/hmg-prod/images/thumb-1920-892817-1567104591.jpg" alt="" /></div>}
            </div>
        </div >
    )
}
