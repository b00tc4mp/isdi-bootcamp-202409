import { useState, useEffect } from 'react'
import logic from '../logic'

import { errors } from 'com'
import { Button } from '../library/index';
import { getCurrencySymbol } from '../util';

const { SystemError } = errors

export default function ManagePacks(props) {
    const [loading, setLoading] = useState(true) //This is to show the loader as active by default

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    const handleAssignPacks = event => {
        console.log('Assign Pack Clicked');
        props.onAssignPackClick()
    };

    const handleCreatePacks = event => {
        console.log('Create Pack Clicked');
        props.onCreatePackClick()
    };

    const [basePacks, setPacks] = useState([])

    useEffect(() => {
        console.log('Packs / PacksList -> componentDidMount')
        const fetchBasePacks = async () => {
            try {
                setLoading(true)
                const basePacks = await logic.getBasePacks()
                console.log('BasePacks fetched successfully', basePacks)
                setPacks(basePacks)
            } catch (error) {
                alert(error.message)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchBasePacks()
    }, [])


    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full h-screen pt-12">
            <h1>Manage Packs</h1>
            <p>This will be the page to manage basePacks</p>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                </div>
            ) : (
                <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                    <thead>
                        <tr className='bg-amarilloCanario'>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {basePacks.map(basePack => (
                            <tr key={basePack.id}>
                                <td className='border px-4 py-2'>{basePack.packName}</td>
                                <td className='border px-4 py-2'>{basePack.description}</td>
                                <td className='border px-4 py-2'>{basePack.price} {getCurrencySymbol(basePack)}</td>
                                <td className='border px-4 py-2'>✏️ ❌ ⛔</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            <div className="flex flex-col ">
                <Button className="btn m-2" onClick={handleAssignPacks}>Assign pack</Button>
                <Button className="btn m-2" onClick={handleCreatePacks}>Create new</Button>

            </div>

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )

}