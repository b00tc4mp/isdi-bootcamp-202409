import 'dotenv/config'
import mongoose from 'mongoose'

import db from '../index.js'
import { Monster, MonsterAction, Stats } from '../models/index.js'

const { Types: { ObjectId } } = mongoose

db.connect(process.env.MONGO_URL!)
    .then(() => Monster.deleteMany())
    .then(() => Promise.all([
        Monster.create({
            name: 'Zombie',
            level: 1,
            type: 'undead',
            statistics: new Stats({ armorClass: 8, hitPoints: 15, strength: 13, dexterity: 6, constitution: 16, intelligence: 3, wisdom: 6, charisma: 5 }),
            actions: [new MonsterAction({ name: 'Slam', description: 'Swings its arm to attack the target.', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a7'), new ObjectId('675fe2b96e02ab06174204a5'), new ObjectId('675fe2b96e02ab06174204a6')]
        }),
        Monster.create({
            name: 'Skeleton',
            level: 1,
            type: 'undead',
            statistics: new Stats({ armorClass: 13, hitPoints: 13, strength: 10, dexterity: 14, constitution: 15, intelligence: 6, wisdom: 8, charisma: 5 }),
            actions: [new MonsterAction({ name: 'Bone Slash', description: 'Slashes with a bone blade.', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204a7'), new ObjectId('675fe2b96e02ab06174204a3')]
        }),
        Monster.create({
            name: 'Spider',
            level: 1,
            type: 'monstrosity',
            statistics: new Stats({ armorClass: 14, hitPoints: 14, strength: 12, dexterity: 16, constitution: 13, intelligence: 2, wisdom: 10, charisma: 4 }),
            actions: [new MonsterAction({ name: 'Web Shot', description: 'Shoots web to damages the target.', type: 'ranged' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204aa'), new ObjectId('675fe2b96e02ab06174204ab')]
        }),
        Monster.create({
            name: 'Ooze',
            level: 1,
            type: 'ooze',
            statistics: new Stats({ armorClass: 7, hitPoints: 10, strength: 8, dexterity: 4, constitution: 16, intelligence: 1, wisdom: 6, charisma: 2 }),
            actions: [new MonsterAction({ name: 'Acid Splash', description: 'Splashes acid at nearby targets.', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204a7'), new ObjectId('675fe2b96e02ab06174204a4')]
        }),
        Monster.create({
            name: 'Harpy',
            level: 1,
            type: 'monstrosity',
            statistics: new Stats({ armorClass: 11, hitPoints: 18, strength: 12, dexterity: 13, constitution: 14, intelligence: 7, wisdom: 10, charisma: 13 }),
            actions: [new MonsterAction({ name: 'Clawa', description: 'Deals damage to the target with sharp claws.', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204a9'), new ObjectId('675fe2b96e02ab06174204a8')]
        }),
        Monster.create({
            name: 'Shambling Mound',
            level: 2,
            type: 'plant',
            statistics: new Stats({ armorClass: 15, hitPoints: 50, strength: 18, dexterity: 8, constitution: 16, intelligence: 5, wisdom: 10, charisma: 7 }),
            actions: [new MonsterAction({ name: 'Entangle', description: 'Entangles targets with vines', type: 'melee' }), new MonsterAction({ name: 'Vine Whip', description: 'Throws a vine from a distance to pull an enemy towards it inflicting damage.', type: 'melee' }), new MonsterAction({ name: 'Slam', description: 'Slams the ground to attack the target', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204ad')]
        }),
        Monster.create({
            name: 'Spider Queen',
            level: 2,
            type: 'monstrosity',
            statistics: new Stats({ armorClass: 17, hitPoints: 60, strength: 16, dexterity: 18, constitution: 14, intelligence: 6, wisdom: 12, charisma: 8 }),
            actions: [new MonsterAction({ name: 'Venomous Bite', description: 'Bites the target.', type: 'melee' }), new MonsterAction({ name: 'Venomous Spray', description: 'Releases a cloud of poison that damages all neaby enemies.', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204ae'), new ObjectId('675fe2b96e02ab06174204ab')]
        }),
        Monster.create({
            name: 'Chimera',
            level: 2,
            type: 'monstrosity',
            statistics: new Stats({ armorClass: 18, hitPoints: 70, strength: 20, dexterity: 14, constitution: 17, intelligence: 6, wisdom: 11, charisma: 9 }),
            actions: [new MonsterAction({ name: 'Claws', description: 'Deals damage to the target with sharp claws.', type: 'melee' }), new MonsterAction({ name: 'Breath of Fire', description: 'Unleashes a breath of fire.', type: 'ranged' }), new MonsterAction({ name: 'Tail Swipe', description: 'It spins quickly, hitting all nearby enemies with its tail.', type: 'melee' })],
            loot: [new ObjectId('675fe2b96e02ab06174204a6'), new ObjectId('675fe2b96e02ab06174204ac'), new ObjectId('675fe2b96e02ab06174204b0')]
        }),
        Monster.create({
            name: 'Umbra\'Khan',
            level: 3,
            type: 'undead',
            statistics: new Stats({ armorClass: 20, hitPoints: 100, strength: 18, dexterity: 14, constitution: 18, intelligence: 20, wisdom: 18, charisma: 22 }),
            actions: [new MonsterAction({ name: 'Dark Pulse', description: 'Unleashes a wave of dark energy.', type: 'ranged' }), new MonsterAction({ name: 'Soul Drain', description: 'Drains the vital essence of an enemy', type: 'ranged' }), new MonsterAction({ name: 'Multiattack', description: 'Deals damage with two spells at the same time.', type: 'ranged' }), new MonsterAction({ name: 'Blight', description: 'Necromantic energy washes over the party target damaging them.', type: 'ranged' })],
            loot: [new ObjectId('675fe2b96e02ab06174204af')]
        })
    ]))
    .catch(console.error)
    .then(() => console.log('populated'))
    .finally(() => db.disconnect())