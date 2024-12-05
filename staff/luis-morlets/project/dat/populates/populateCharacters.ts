import 'dotenv/config'
import mongoose from 'mongoose'

import db from '../index.js'
import { Character, Skill, Stats, Currency } from '../models/index.js'

const { Types: { ObjectId } } = mongoose

db.connect(process.env.MONGO_URL_TEST!)
    .then(() => Character.deleteMany())
    .then(() => Promise.all([
        Character.create({
            name: 'Phinolle Dalvush',
            class: 'Ranger',
            race: 'Half-Elf',
            statistics: new Stats({ armorClass: 14, hitPoints: 11, strength: 12, dexterity: 15, constitution: 17, intelligence: 8, wisdom: 14, charisma: 10 }),
            skills: [new Skill({ name: 'Longbow', description: 'You draw you bow and attack the enemy in the distance', levelRequirement: 1 }), new Skill({ name: 'Hunter\'s mark', description: 'You magically mark one creature you can see within range as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with an attack roll.', levelRequirement: 1 }), new Skill({ name: 'Fire Arrow', description: ' The adventurer ignites a flaming arrow and fires it with devastating precision. On impact, the arrow explodes in a wave of fire, setting his target on fire.', levelRequirement: 2 }), new Skill({ name: 'Rain of Arrows', description: 'The ranger aims into the sky and unleashes a storm of arrows that fall over a wide area, devastating all enemies caught in range.', levelRequirement: 3 })],
            currency: new Currency({ name: 'Gold Coin', quantity: 50 }),
            items: [new ObjectId('67516a89253c059da7f10f58'), new ObjectId('67516a89253c059da7f10f58')]
        }),
        Character.create({
            name: 'Grothar Skullcrusher',
            class: 'Barbarian',
            race: 'Orc',
            statistics: new Stats({ armorClass: 15, hitPoints: 15, strength: 18, dexterity: 12, constitution: 16, intelligence: 8, wisdom: 10, charisma: 9 }),
            skills: [new Skill({ name: 'Rage', description: 'Enter a furious rage for 2 turns, increasing attack damage.', levelRequirement: 1 }), new Skill({ name: 'Reckless Attack', description: 'Attack with advantage, but enemies have advantage on attack rolls against you until your next turn.', levelRequirement: 1 }), new Skill({ name: 'Brutal Smash', description: 'Unleash a powerful blow that deals extra damage equal to your Strength modifier.', levelRequirement: 2 }), new Skill({ name: 'Earthquake Slam', description: 'Slam the ground with your weapon, causing a shockwave that knocks enemies prone.', levelRequirement: 3 })],
            currency: new Currency({ name: 'Gold Coin', quantity: 50 }),
            items: [new ObjectId('67516a89253c059da7f10f58'), new ObjectId('67516a89253c059da7f10f58')]
        }),
        Character.create({
            name: 'Thalin Lightbringer',
            class: 'Paladin',
            race: 'Human',
            statistics: new Stats({
                armorClass: 18, hitPoints: 13,
                manaPoints: 10, strength: 16, dexterity: 10, constitution: 14, intelligence: 10, wisdom: 13, charisma: 16
            }),
            skills: [new Skill({ name: 'Divine Smite', description: 'When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage.', manaCost: 2, levelRequirement: 1 }), new Skill({ name: 'Lay on Hands', description: 'Touch a creature and restore a number of hit points equal to your Paladin level.', manaCost: 4, levelRequirement: 1 }), new Skill({ name: 'Shield of Faith', description: 'Create a shimmering field granting a +2 bonus to AC.', manaCost: 5, levelRequirement: 2 }), new Skill({ name: 'Holy Wrath', description: 'Unleash a burst of holy energy, dealing radiant damage to all nearby enemies.', manaCost: 6, levelRequirement: 3 })],
            currency: new Currency({ name: 'Gold Coin', quantity: 50 }),
            items: [new ObjectId('67516a89253c059da7f10f58'), new ObjectId('67516a89253c059da7f10f5a')]
        }),
        Character.create({
            name: 'Qivos Shadowstep',
            class: 'Rogue',
            race: 'Tiefling',
            statistics: new Stats({ armorClass: 14, hitPoints: 12, strength: 10, dexterity: 18, constitution: 12, intelligence: 12, wisdom: 10, charisma: 11 }),
            skills: [new Skill({ name: 'Backstab', description: 'Strike from the shadows to deal critical damage.', levelRequirement: 1 }), new Skill({ name: 'Throwing Dagger', description: 'Equips a dagger and throw it to damage the enemy.', levelRequirement: 1 }), new Skill({ name: 'Poisoned Blade', description: 'Coat your weapon with poison, dealing damage over time.', levelRequirement: 2 }), new Skill({ name: 'Shadow Dance', description: 'Vanish into the shadows, becoming invisible for one turn.', levelRequirement: 3 })],
            currency: new Currency({ name: 'Gold Coin', quantity: 50 }),
            items: [new ObjectId('674fabc309c47e901f27d0ec'), new ObjectId('674fabc309c47e901f27d0ec')]
        }),
        Character.create({
            name: 'Eldon Brightstaff',
            class: 'Cleric',
            race: 'Dwarf',
            statistics: new Stats({ armorClass: 16, hitPoints: 12, manaPoints: 10, strength: 12, dexterity: 10, constitution: 14, intelligence: 10, wisdom: 18, charisma: 12 }),
            skills: [new Skill({ name: 'Sacred Flame', description: 'Call down holy fire to damage an enemy.', manaCost: 2, levelRequirement: 1 }), new Skill({ name: 'Healing Word', description: 'Heal a wounded ally from a distance.', manaCost: 4, levelRequirement: 1 }), new Skill({ name: 'Blessing', description: 'Bless nearby allies, increasing their attack rolls.', manaCost: 4, levelRequirement: 2 }), new Skill({ name: 'Divine Sanctuary', description: 'Create a zone of protection that heals allies.', manaCost: 6, levelRequirement: 3 })],
            currency: new Currency({ name: 'Gold Coin', quantity: 50 }),
            items: [new ObjectId('67516a89253c059da7f10f5a'), new ObjectId('67516a89253c059da7f10f58')]
        }),
        Character.create({
            name: 'Camilla La Croix',
            class: 'Mage',
            race: 'Elf',
            statistics: new Stats({ armorClass: 12, hitPoints: 8, manaPoints: 15, strength: 8, dexterity: 14, constitution: 12, intelligence: 18, wisdom: 14, charisma: 10 }),
            skills: [new Skill({ name: 'Magic Missile', description: 'Launch a magical projectile that never misses its target.', manaCost: 2, levelRequirement: 1 }), new Skill({ name: 'Arcane Shield', description: 'Create a magical shield that absorbs incoming damage.', manaCost: 4, levelRequirement: 1 }), new Skill({ name: 'Fireball', description: 'Hurl a fiery explosion that deals massive area damage.', manaCost: 5, levelRequirement: 2 }), new Skill({ name: 'Ice Storm', description: 'A hail of rock-hard ice pounds the ground to deal damage to enemies in area.', manaCost: 8, levelRequirement: 3 })],
            currency: new Currency({ name: 'Gold Coin', quantity: 50 }),
            items: [new ObjectId('67516a89253c059da7f10f5a'), new ObjectId('67516a89253c059da7f10f58')]
        })
    ]))
    .catch(console.error)
    .then(() => console.log('populated'))
    .finally(() => db.disconnect())