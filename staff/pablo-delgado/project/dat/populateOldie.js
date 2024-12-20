import 'dotenv/config';
import { User, Category, Provider, Location } from './models.js'
import db from './index.js'


db.connect(process.env.MONGO_URL)
  .then(() => Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Provider.deleteMany()
  ]))
  .then(() => {
    return Promise.all([
        Category.create({ name: 'vet', services: ['Chequeos médicos', 'revision', 'revisión', 'checkup', 'Vacunación', 'Cirugías', 'desparasitación'] }), 
        Category.create({ name: 'grooming', services: ['Baño', 'Corte de pelo', 'pelo', 'uñas', 'cuidado', 'Estilismo', 'Corte de uñas'] }), 
        Category.create({ name: 'trainer', services: ['Entrenamiento', 'adiestramiento', 'canino', 'Corrección de comportamiento', 'comportamiento', 'caracter'] }), 
        Category.create({ name: 'petsitter', services: ['Cuidado de mascotas en casa', 'cuidado', 'Paseos programados', 'paseos', 'Acompañamiento nocturno', 'paseador', 'cuidador'] }), 
        Category.create({ name: 'boarding', services: ['Hospedaje', 'cuidado', 'guardería', 'guarderia'] })
    ])
  .then(categories => {
    const [vet, grooming, trainer, petsitter, boarding] = categories;

    return Promise.all([
        Provider.create({ name: 'Hospital Veterinària del Mar', image: 'https://lh5.googleusercontent.com/p/AF1QipPFN3UXiuncdDaqV5jWXR_I119iVk1zZesjqcAf=w501-h240-k-no', phoneNumber: '930217812', openingHours: ['Open 24h'], categories: [vet._id], location: new Location({ coordinates: [41.3926085476975, 2.1897713304913746] }), address: 'Carrer de la Marina, 69, Sant Martí', city: 'Barcelona', postalCode: '08005' }),
        Provider.create({ name: 'AniCura Glòries Hospital Veterinari', image: 'https://lh5.googleusercontent.com/p/AF1QipPIbOfebkYidI_HUlFRWe0aJHG-4yKDQsjBOzyo=w408-h271-k-no', phoneNumber: '932460805', openingHours: ['Open 24h'], categories: [vet._id], location: new Location({ coordinates: [41.39335972805441, 2.176112984461523] }), address: 'Carrer de Bailèn, 28, local, L\'Eixample', city: 'Barcelona', postalCode: '08010' }),
        Provider.create({ name: 'Clínica Veterinària Family Vet', image: 'https://lh5.googleusercontent.com/p/AF1QipMsRLTXFqN4LHX7qqPyBeCYc-Axc6VG4lu9czHo=w408-h287-k-no', phoneNumber: '637844398', openingHours: ['Mon: 10:00-20:00', 'Tue: 10:00-20:00', 'Wed: 10:00-20:00', 'Thu: 10:00-20:00', 'Fri: 10:00-20:00', 'Sat: Closed', 'Sun: Closed'], categories: [vet._id], location: new Location({ coordinates: [41.40408936685165, 2.1700541691182424] }), address: 'Carrer del Rosselló, 395, Local 6, Gracia', city: 'Barcelona', postalCode: '08025' }),
        Provider.create({ name: 'Lovedogs', image: 'https://lh5.googleusercontent.com/p/AF1QipPpFV7fHqH2nN30NR4XUq_z25oLPwxTy-wQ1Kwi=w408-h402-k-no', phoneNumber: '936738159', openingHours: ['Monday, 10 AM–2 PM / 4:30–8 PM', 'Tuesday, 10 AM–2 PM / 4:30–8 PM', 'Wednesday, 10 AM–2 PM / 4:30–8 PM', 'Thursday, 10 AM–2 PM / 4:30–8 PM', 'Friday, 10 AM–2 PM, 4:30–8 PM', 'Saturday, 10 AM–2 PM', 'Sunday, Closed'], categories: [grooming._id], location: new Location({ coordinates: [41.3999754315084, 2.1689067897555434] }), address: 'Pg. de St. Joan, 103, L\'Eixample', city: 'Barcelona', postalCode: '08037' }),
        Provider.create({ name: 'Woody\'s Salon', image: 'https://lh5.googleusercontent.com/p/AF1QipNhI7KGnCB0wQ2_gPirnb4yhpWlUlWN3K7EuwSM=w408-h500-k-no', phoneNumber: '931301463', openingHours: ['Monday, 9 AM–8 PM', 'Tuesday, 9 AM–8 PM', 'Wednesday, 9 AM–8 PM', 'Thursday, 9 AM–8 PM', 'Friday, 9 AM–8 PM', 'Saturday: Closed', 'Sunday: Closed'], categories: [grooming._id], location: new Location({ coordinates: [41.39063195326468, 2.1549908812632035] }), address: 'C/ de Muntaner, 134, Eixample', city: 'Barcelona', postalCode: '08036' }),
        Provider.create({ name: 'Waku-Waku Mascotas Paralelo 180', image: 'https://lh5.googleusercontent.com/p/AF1QipM-dKHHCFtxcANihpIQcuxuLda9dFqGyYNHbAa2=w426-h240-k-no', phoneNumber: '933278673', openingHours: ['Monday, 10 AM–9 PM', 'Tuesday, 10 AM–9 PM', 'Wednesday: 10 AM–9 PM', 'Thursday: 10 AM–9 PM', 'Friday: 10 AM–9 PM', 'Saturday: 10 AM–9 PM', 'Sunday: Closed'], categories: [grooming._id], location: new Location({ coordinates: [41.37648030914956, 2.154647558514288] }), address: 'Av. del Paral·lel, 180, L\'Eixample', city: 'Barcelona', postalCode: '08015' }),
        Provider.create({ name: 'Educación Canina & Cuidadores de Animales -MAMADOG', image: 'https://lh5.googleusercontent.com/p/AF1QipM9y334SnFkgzaoM9VRwHavWJpT3atn82DqKWG-=w564-h240-k-no', phoneNumber: '662335436', openingHours: ['Monday: 9 AM - 8 PM', 'Tuesday: 9 AM - 8 PM', 'Wednesday: 9 AM - 8 PM', 'Thursday: 9 AM - 8 PM', 'Friday: 9 AM - 8 PM', 'Saturday: 9 AM - 8 PM', 'Sunday: 9 AM - 8 PM'], categories: [trainer._id], location: new Location({ coordinates: [41.40036220878578, 2.174703712735674] }), address: 'Carrer d\'Aragó, 412, L\'Eixample', city: 'Barcelona', postalCode: '08013' }),
        Provider.create({ name: 'Boncan Educació Canina', image: 'https://lh5.googleusercontent.com/p/AF1QipOjJFUNQt8UUOrqDyrlKYYmHtGoV352mTHXhBmj=w408-h250-k-no', phoneNumber: '687728722', openingHours: ['Monday: 8 AM - 8 PM', 'Tuesday: 8 AM - 8 PM', 'Wednesday: 8 AM - 8 PM', 'Thursday: 8 AM - 8 PM', 'Friday: 8 AM - 8 PM', 'Saturday: Closed', 'Sunday: Closed'], categories: [trainer._id], location: new Location({ coordinates: [41.904808377788235, 2.229396817679128] }), address: 'Passatge de Sant Bernat, 6, Ciutat Vella', city: 'Barcelona', postalCode: '08001' }),
        Provider.create({ name: 'Dog Care Barcelona', image: 'https://lh5.googleusercontent.com/p/AF1QipPGZeUVXzQ-2UF1M3Gqpq32ZIr52MPvTUR00z7p=w426-h240-k-no', phoneNumber: '610399468', openingHours: ['Monday: 9 AM - 11 PM', 'Tuesday: 9 AM - 11 PM', 'Wednesday: 9 AM - 11 PM', 'Thursday: 9 AM - 11 PM', 'Friday: 9 AM - 11 PM', 'Saturday: 10:30 AM - 8 PM', 'Sunday: 11 AM - 6 PM'], categories: [petsitter._id], location: new Location({ coordinates: [41.386736533646406, 2.1723496522853387] }), address: 'Pl. de la Vila de Madrid, Ciutat Vella', city: 'Barcelona', postalCode: '08002' }),
        Provider.create({ name: 'Passejador i cangur de mascotes TORACANINA', image: 'https://lh5.googleusercontent.com/p/AF1QipN1HgYYcgQTZviwX2B6hkBnzhaB0LZ6WHaoTMij=w408-h272-k-no', phoneNumber: '623448912', openingHours: ['Open 24h'], categories: [petsitter._id], location: new Location({ coordinates: [41.38403185857433, 2.1754395570255816] }), address: 'Carrer de Ferran, Ciutat Vella', city: 'Barcelona', postalCode: '08002' }),
        Provider.create({ name: 'Dogpark', image: 'https://lh5.googleusercontent.com/p/AF1QipPvMx6WCmxlmPpkiYVA-tPi1tnxXcVs-vvbDtHN=w408-h544-k-no', phoneNumber: '614182725', openingHours: ['Monday: 8 AM - 8 PM', 'Tuesday: 8 AM - 8 PM', 'Wednesday: 8 AM - 8 PM', 'Thursday: 8 AM - 8 PM', 'Friday: 8 AM - 8 PM', 'Saturday: Closed', 'Sunday: Closed'], categories: [boarding._id], location: new Location({ coordinates: [41.38706314991457, 2.154910030687229] }), address: 'Carrer de València, 121, local 3, Eixample', city: 'Barcelona', postalCode: '08011' })
    ]);
  })
  .then(() => {
    console.log('Datos insertados correctamente');
  })
  .catch(console.error)
  .finally(() => db.disconnect())})
