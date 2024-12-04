import { useState, useEffect } from "react"
import logic from "../logic"

import { Button } from "../library";


export default function Home(props) {
    console.log('Home -> render')

    const handleManagePacks = event => {
        console.log("Manage packs clicked");
        //event.preventDefault()
        props.onManagePacksClick()
    };

    const handleManageCustomers = event => {
        console.log("Manage customers clicked");
        //event.preventDefault()
        props.onManageCustomersClick()
    };

    const handleManagePurchasedPacks = event => {
        console.log("Manage Purchased packs clicked");
        //event.preventDefault()
        props.onManagePurchasedPacksClick()
    };


    {
        return (
            <main className="flex flex-col items-center bg-color_backgroundGrey w-full h-screen p-4 pt-12">

                <header className="mb-8 text-center ">
                    <h2 className="text-3xl font-bold text-color_darkBlue mb-2">Welcome, name_of_user</h2>
                    <p className="text-color_strongGrey">What would you like to do today?</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl justify-items-center">
                    <Button className="bg-color_green hover:bg-color_greenDark text-white">Start tracking</Button>
                    <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleManagePacks}>Manage your packs</Button>
                    <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleManageCustomers}>Manage your customers</Button>
                    <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleManagePurchasedPacks}>See purchased services</Button>
                    <Button className="bg-color_green hover:bg-color_greenDark text-white">Settings</Button>
                </div>
            </main>
        )
    }
}