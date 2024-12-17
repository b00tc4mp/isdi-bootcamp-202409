import { useState, useEffect } from 'react'
import logic from '../logic'

import { errors } from 'com'
import { Button, Field, Label, Input } from '../library/index';

const { SystemError } = errors

export default function ManagePacks(props) {
    const [loading, setLoading] = useState(true) //This is to show the loader as active by default

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    /* const handleAssignPacks = event => {
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
    }, []) */


    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full h-screen pt-12">
            <h1 className='text-3xl'>Tracker</h1>
            <p>This will be the page to track your projects</p>
            <div className="flex flex-col">
                <h2 className='text-2xl'>Customer and Pack</h2>
                <form className="flex flex-col justify-items-start" /* onSubmit={handleSubmit} */ >


                    <Field>
                        <Label htmlFor="selectCustomer">Select Customer</Label>
                        <select id="selectCustomer" name="selectCustomer" className="border-2 rounded-lg w-full p-2">
                            {/*  {basePacks.map((basePack) => (
            <option key={basePack.id} value={basePack.id}>{basePack.packName} - {basePack.price}{getCurrencySymbol(basePack)}</option>
        ))} */}
                            <option>Customer 1</option>
                            <option>Customer 2</option>
                            <option>Customer 3</option>
                        </select>
                    </Field>

                    <Field>
                        <Label htmlFor="selectPack">Select Pack</Label>
                        <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2">
                            {/* {basePacks.map((basePack) => (
            <option key={basePack.id} value={basePack.id}>{basePack.packName} - {basePack.price}{getCurrencySymbol(basePack)}</option>
        ))} */}
                            <option>Pack 1</option>
                            <option>Pack 2</option>
                            <option>Pack 3</option>
                        </select>
                    </Field>

                </form>

            </div>


            {/* {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                </div>
            ) : ( */}
            <h2 className='text-2xl'>History</h2>
            <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                <thead>
                    <tr className='bg-color_Grey'>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Remaning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border px-4 py-2'>Task description 3</td>
                        <td className='border px-4 py-2'>16/12/2024</td>
                        <td className='border px-4 py-2'>-1:30h</td>
                        <td className='border px-4 py-2 text-red-500'>0:30h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Task description 3</td>
                        <td className='border px-4 py-2'>16/12/2024</td>
                        <td className='border px-4 py-2'>-3:00h</td>
                        <td className='border px-4 py-2 text-red-500'>2:00h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Task description 2</td>
                        <td className='border px-4 py-2'>10/12/2024</td>
                        <td className='border px-4 py-2'>-3:00h</td>
                        <td className='border px-4 py-2'>5:00h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Task description 1</td>
                        <td className='border px-4 py-2'>05/12/2024</td>
                        <td className='border px-4 py-2'>-2:00h</td>
                        <td className='border px-4 py-2'>8:00h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Add new pack 10h</td>
                        <td className='border px-4 py-2'>01/12/2024</td>
                        <td className='border px-4 py-2'>+10:00h</td>
                        <td className='border px-4 py-2'>10:00h</td>
                    </tr>
                </tbody>
            </table>
            {/*  )} */}


            <div className="flex flex-col ">
                {/* <Button className="btn m-2" onClick={handleAssignPacks}>Next</Button> */}
                <Button className="btn m-2">Start tracking</Button>
            </div>

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )

}