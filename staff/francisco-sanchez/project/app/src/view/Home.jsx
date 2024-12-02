import { useState, useEffect } from "react"
import logic from "../logic"


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
            <div className="mainView">
                <h2 className="text-lime-300 uppercase bg-indigo-500" >Finnaly your arrived at home!!!</h2>
                <p>Welcome, name_of_user</p>

                <div className="flex flex-col ">
                    <button className="btn m-2">Start tracking WIP</button>
                    <button className="btn m-2" onClick={handleManagePacks}>Manage your packs WIP</button>
                    <button className="btn m-2" onClick={handleManageCustomers}>Manage your customers WIP</button>
                    <button className="btn m-2" onClick={handleManagePurchasedPacks}>See purchased services WIP</button>
                    <button className="btn m-2">Setings WIP</button>
                </div>
            </div>
        )
    }
}