import React from 'react'
import assets from '../assets'

export default function SideBar({ activeTab, setActiveTab }) {
    return (
        <div className="w-[18%] min-h-screen border-r-2">
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <button
                    className={`flex items-center gap-3 border border-green-700 px-4 py-2 rounded-l ${activeTab === 'profile' ? 'bg-green-700 text-white' : 'bg-black text-white'
                        }`}
                    onClick={() => setActiveTab('profile')}
                >
                    <img className="w-5 h-5" src={assets.profileIcon} alt="Profile" />
                    <p className="hidden md:block">Profile</p>
                </button>
                <button
                    className={`flex items-center gap-3 border border-green-700 px-4 py-2 rounded-l ${activeTab === 'favorites' ? 'bg-green-700 text-white' : 'bg-black text-white'
                        }`}
                    onClick={() => setActiveTab('favorites')}
                >
                    <img className="w-5 h-5" src={assets.favoriteIcon} alt="Favorites" />
                    <p className="hidden md:block">Favorites</p>
                </button>
                <button
                    className={`flex items-center gap-3 border border-green-700 px-4 py-2 rounded-l ${activeTab === 'reviews' ? 'bg-green-700 text-white' : 'bg-black text-white'
                        }`}
                    onClick={() => setActiveTab('reviews')}
                >
                    <img className="w-5 h-5" src={assets.reviewIcon} alt="Reviews" />
                    <p className="hidden md:block">Reviews</p>
                </button>
            </div>
        </div>
    )
}
