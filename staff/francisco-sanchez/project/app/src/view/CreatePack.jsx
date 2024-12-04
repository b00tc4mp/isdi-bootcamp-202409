import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image } from '../library'

export default function CreatePack(props) {
    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return (
        <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
            <h2 className="">Create new pack</h2>
            <div className="flex flex-col">
                <form className="flex flex-col justify-items-start" >
                    <Field>
                        <Input className="border-2 rounded-lg" type="text" id="packName" placeholder="Pack name" />
                    </Field>

                    <Field>
                        <Input className="border-2 rounded-lg" type="email" id="description" placeholder="Pack description" />
                    </Field>

                    <Field>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input className="border-2 rounded-lg" type="number" id="quantity" placeholder="Quantity" />
                    </Field>

                    <Field>
                        <Input className="border-2 rounded-lg" type="unit" id="unit" />
                    </Field>


                    <Button type="submit">Create Pack</Button>
                </form>
            </div>
        </main>
    )
}