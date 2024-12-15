import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Button, Input, Label, Form } from '../../library';
import { errors } from 'com';
import { loginUser } from '../../logic';
import { useContext } from 'react';

const { SystemError } = errors

export default function updateBasePack({ onEditClick, onCancelClick }) {
    const [basePack, setBasePack] = useState(null)
    const { alert } = useContext()
    const { basePackId } = useParams()


    const handleSubmit = event => {
        event.preventDefault()
    }

    const handleCancelClick = event => {
        event.preventDefault()
    }

    return <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
        <h2 className="text-2xl">Update a pack</h2>
        <div className="flex flex-col">
            <form className="flex flex-col justify-items-start" onSubmit={handleSubmit} >
                <Field>
                    <Label htmlFor="packName">Pack name</Label>
                    <Input className="border-2 rounded-lg" type="text" id="packName" placeholder="Pack name" />
                </Field>

                <Field>
                    <Label htmlFor="packDescription">Pack description</Label>
                    <textarea className="border-2 rounded-lg" type="email" id="packDescription" placeholder="Pack description goes here" />
                </Field>

                <Field>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input className="border-2 rounded-lg" type="number" id="quantity" placeholder="Quantity" />
                </Field>

                <Field>
                    <Label htmlFor="unit">Unit</Label>
                    <select id="unit" name="unit">
                        <option value="hours">Hours</option>
                        <option value="units">Units</option>
                    </select>
                </Field>

                <Field>
                    <Label htmlFor="expiringTime">Expiring pack time</Label>
                    <select id="expiringTime" name="expiringTime">
                        <option value="-1">Unlimited</option>
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="4">4 Months</option>
                        <option value="5">5 Months</option>
                        <option value="6">6 Months</option>
                        <option value="7">7 Months</option>
                        <option value="8">8 Months</option>
                        <option value="9">9 Months</option>
                        <option value="10">10 Months</option>
                        <option value="11">11 Months</option>
                        <option value="12">12 Months</option>
                    </select>
                </Field>

                <Field>
                    <Label htmlFor="price">Price</Label>
                    <Input className="border-2 rounded-lg w-full" type="number" id="price" placeholder="50 €" />
                    <input type="hidden" id="currency" defaultValue="EUR" />
                </Field>

                <Button className='bg-red-800 text-white' onClick={handleCancelClick}>Cancel</Button>
                <Button type="submit">Confirm</Button>
            </form>
        </div>
    </main>

}