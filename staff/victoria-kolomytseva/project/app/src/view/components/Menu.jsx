
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
                <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-600" fill="#000000" width="32px" height="32px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.417 9.579A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.917zm-11.293.252A1.31 1.31 0 0 0 5.648 8.1c-.267-.76-.934-1.22-1.49-1.024a1.31 1.31 0 0 0-.524 1.73c.267.761.934 1.22 1.49 1.025zm6.664.747a4.606 4.606 0 0 0-6.518 0 1.945 1.945 0 0 0 2.75 2.75.72.72 0 0 1 1.017 0 1.945 1.945 0 0 0 2.75-2.75zM5.84 6.986c.087.918.7 1.61 1.372 1.547.67-.064 1.143-.86 1.057-1.777-.087-.917-.701-1.61-1.372-1.546-.67.063-1.144.859-1.057 1.776zm4.003 1.547c.671.063 1.285-.63 1.372-1.547.087-.917-.386-1.713-1.057-1.776-.67-.064-1.285.629-1.372 1.546-.086.918.387 1.713 1.057 1.777zM12.9 7.076c-.556-.195-1.223.263-1.49 1.024a1.31 1.31 0 0 0 .524 1.73c.556.196 1.223-.263 1.49-1.024a1.31 1.31 0 0 0-.524-1.73z"></path></g></svg>
                <span className="text-sm text-gray-900">Ad</span>
            </button>
            <button type="button" onClick={handleCreatePostClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 group">
                <svg fill="#000000" width="64px" height="64px" viewBox="-1.7 0 20.4 20.4" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500 group-hover:text-blue-600"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.416 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.916 7.917zm-2.958.01a.792.792 0 0 0-.792-.792H9.284V6.12a.792.792 0 1 0-1.583 0V9.5H4.32a.792.792 0 0 0 0 1.584H7.7v3.382a.792.792 0 0 0 1.583 0v-3.382h3.382a.792.792 0 0 0 .792-.791z"></path></g></svg>
                <span className="text-sm text-gray-900">Lost pet</span>
            </button>
            <button type="button" onClick={handlePetFoundClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 group">

                <img src="/assets/found-pet.svg" alt="" className='size-8' />
                <span className="text-sm text-gray-900">Found pet</span>
            </button>
            <button type="button" onClick={handleProfileClick} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 group">
                <svg className="w-7 h-7 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" /></svg>
                <span className="text-sm text-gray-900">Profile</span>
            </button>
        </div>
    </div>



}