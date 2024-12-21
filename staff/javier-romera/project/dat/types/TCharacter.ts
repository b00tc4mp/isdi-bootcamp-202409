import { ObjectId } from "mongoose"

type TCharacter = {
    _id: ObjectId,
    name: string,
    alias: string,
    gender: string
    affiliation: string,
    race: string,
    devilFruit: ObjectId,
    bounty: BigInt,
    height: number,
    firstArc: ObjectId,
    description: string,
    armament: boolean,
    conqueror: boolean,
    observation: boolean,
    sea: string,
    town: string | null
}

export default TCharacter