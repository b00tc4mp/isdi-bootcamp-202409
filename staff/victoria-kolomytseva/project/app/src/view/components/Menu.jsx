
import { useNavigate } from 'react-router-dom'

export default function Menu({ userId }) {

    const navigate = useNavigate()
    const handlHomeClick = () => navigate('/')
    const handleProfileClick = () => navigate('/profile/' + userId)

    const handleCreatePostClick = () => navigate('/create-post')
    const handlePetFoundClick = () => navigate('/post-found')




    return <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-50">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <button type="button" onClick={handlHomeClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 
             group">
                <img src="/assets/ad.svg" alt="" />
                <span className="text-sm text-gray-900">Ad</span>
            </button>
            <button type="button" onClick={handleCreatePostClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 group">
                <img src="/assets/lostpet.svg" alt="" className='size-8' />
                <span className="text-sm text-gray-900">Lost pet</span>
            </button>
            <button type="button" onClick={handlePetFoundClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 group">
                <img src="/assets/found-pet.svg" alt="" className='size-8' />
                <span className="text-sm text-gray-900">Found pet</span>
            </button>
            <button type="button" onClick={handleProfileClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 group">
                <img className="w-7 h-7 text-gray-900" src="/assets/profile.svg" alt="" />
                <span className="text-sm text-gray-900">Profile</span>
            </button>
        </div>
    </div>



}