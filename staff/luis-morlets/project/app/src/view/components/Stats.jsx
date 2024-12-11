import useContext from '../useContext'
import { useEffect, useState } from 'react'

export default function Stats({ character }) {
    console.log('Stats -> render')

    const { name, class: charClass, race, statistics } = character

    return <section className="flex relative
    left-[3rem] h-[90%] w-[45%] self-center bg-[url('/images/menusbg.png')] bg-center bg-cover">
        <div className="absolute w-full h-full z-10 text-center text-3xl flex flex-col justify-center">
            <h2 className="text-3xl text-black">{name}</h2>
            <h3 className="text-3xl text-black">{charClass}</h3>
            <h3 className="text-3xl text-black">{race}</h3>
            <div>
                <p>AC: {statistics.armorClass}</p>
                <p>HP: {statistics.hitPoints}</p>
                <p>Strength: {statistics.strength}</p>
                <p>Dexterity: {statistics.dexterity}</p>
                <p>Constitution: {statistics.constitution}</p>
                <p>Intelligence: {statistics.intelligence}</p>
                <p>Wisdom: {statistics.wisdom}</p>
                <p>Charisma: {statistics.charisma}</p>
            </div>
        </div>
    </section>
}