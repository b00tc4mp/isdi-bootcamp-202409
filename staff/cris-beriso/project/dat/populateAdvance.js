import 'dotenv/config'

import bcrypt from 'bcryptjs'

import db, { User, Product, Store, StorePrice, Comment, Location, Point } from './index.js'

db.connect(process.env.MONGO_URL)
  .then(() => Promise.all([
    User.deleteMany(),
    Product.deleteMany(),
    Store.deleteMany(),
    StorePrice.deleteMany(),
    Comment.deleteMany(),
    Location.deleteMany(),
    Point.deleteMany()
  ]))
  .then(() => {
    return Promise.all([
      User.create({ name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: bcrypt.hashSync('criscris', 10), role: 'admin' }),
      User.create({ name: 'Yannick', email: 'yan@nick.com', username: 'yannickscf', password: bcrypt.hashSync('criscris', 10), role: 'regular' }),
      User.create({ name: 'Cofy', email: 'cofy@dog.com', username: 'cofythedog', password: bcrypt.hashSync('criscris', 10), role: 'regular' }),
      User.create({ name: 'Rocket', email: 'rocket@cat.com', username: 'rocketthecat', password: bcrypt.hashSync('criscris', 10), role: 'regular' })
    ]);
  })
  .then(([user1]) => {
    return Promise.all([
      Store.create({
        name: 'Perfumerías Primor',
        web: 'https://www.primor.eu/es_es/',
        locations: [
          {
            address: 'P.º de la Florida, 2, Moncloa - Aravaca, 28008 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42133179225622, -3.71998665480542]
            }
          },
          {
            address: 'Calle de Fuencarral, 133, Chamberí, 28010 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.43202296556586, -3.7037814136988527]
            }
          },
          {
            address: 'Gran Vía, 39, Centro, 28013 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.420092766337895, -3.705580105164164]
            }
          },
          {
            address: 'Prta del Sol, 11, Centro, 28013 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.4173764754467, -3.7039096581332616]
            }
          },
          {
            address: 'Calle de Fuencarral, 46, Centro, 28004 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42338310972359, -3.700571627834522]
            }
          },
          {
            address: 'Calle de Goya, 59, Salamanca, 28001 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42527941846422, -3.681164760439192]
            }
          },
          {
            address: 'Calle de Goya, 22, Salamanca, 28001 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.424842159111385, -3.6833200596476123]
            }
          },
          {
            address: 'C. de Orense, 16, Tetuán, 28020 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.44990262299382, -3.694946771790625]
            }
          }
        ]
      }),
      Store.create({
        name: 'Druni',
        web: 'https://www.druni.es/',
        locations: [
          {
            address: 'Gran Vía, 61, Centro, 28013 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42261179231897, -3.7096452772076205]
            }
          },
          {
            address: 'Calle de Fuencarral, 149, Chamberí, 28010 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.43308835164264, -3.7043862503609573]
            }
          },
          {
            address: 'P.º de las Acacias, 20, Arganzuela, 28005 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.40389760435808, -3.706943250804547]
            }
          },
          {
            address: 'C. de Orense, 4, Tetuán, 28020 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.44762661023306, -3.695382950926849]
            }
          },
          {
            address: 'C. de Bravo Murillo, 187, Tetuán, 28020 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.45352969286624, -3.7031403056038426]
            }
          },
          {
            address: 'C. de Velázquez, 34, Salamanca, 28001 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.425873936953366, -3.683951059823913]
            }
          },
          {
            address: 'C. de Clara del Rey, 51, Chamartín, 28002 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.44467487446922, -3.668844632295032]
            }
          },
          {
            address: 'C. de Alcalá, 367, Cdad. Lineal, 28027 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.43468817103967, -3.6442677138646937]
            }
          }
        ]
      }),
      Store.create({
        name: 'Sephora',
        web: 'https://www.sephora.es/',
        locations: [
          {
            address: 'ECI Princessa GROUND FLOOR, Calle de la Princesa, 56, Centro, 28008 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.4301174666671, -3.715486779609403]
            }
          },
          {
            address: 'Eci Preciados, C. de Preciados, 3, Ground Floor, Centro, 28013 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.419401819753595, -3.7051870979150845]
            }
          },
          {
            address: 'Prta del Sol, 11, Centro, 28013 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.41744145574421, -3.703813807022509]
            }
          },
          {
            address: 'ECI Castellana, C. de Raimundo Fernández Villaverde, 79, Ground floor, Tetuán, 28003 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.44710218875655, -3.6943724321360514]
            }
          },
          {
            address: 'C. de Serrano, 36, Ground Floor, Salamanca, 28001 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42541324652857, -3.687505977673172]
            }
          },
          {
            address: 'C. de Velázquez, 41, Salamanca, 28001 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42685068203562, -3.6840727504417328]
            }
          },
          {
            address: 'C. de Alfonso XII, 34, Retiro, 28014 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.41390672535115, -3.6893159710600725]
            }
          },
          {
            address: 'ECI Goya, Calle de Goya, 76, GROUND FLOOR, Salamanca, 28009 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.42468412910668, -3.67484248353112]
            }
          }
        ]
      }),
      Store.create({
        name: 'Douglas',
        web: 'https://www.douglas.es/es',
        locations: [
          {
            address: 'P.º de las Acacias, 23, Arganzuela, 28005 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.40405227569075, -3.705815082734376]
            }
          },
          {
            address: 'C. de Velázquez, 106, Salamanca, 28006 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.435417487250646, -3.682984116984814]
            }
          },
          {
            address: 'Calle de Goya, 51, Salamanca, 28001 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.425225397686845, -3.6819541488153824]
            }
          },
          {
            address: 'Calle de Diego de León, 69, Salamanca, 28006 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.43476419451116, -3.675087694352504]
            }
          },
          {
            address: 'C. de Colombia, 4, Chamartín, 28016 Madrid',
            location: {
              type: 'Point',
              coordinates: [40.456972586619685, -3.677834276137655]
            }
          }
        ]
      }),
      Store.create({
        name: 'Maquillalia',
        web: 'https://www.maquillalia.com/'
      }),
      Store.create({
        name: 'Beauty Bay',
        web: 'https://www.beautybay.com/'
      })

    ]).then(([store1, store2, store3, store4, store5, store6]) => {
      return Promise.all([
        Product.create({
          name: 'Catrice HD Liquid Coverage Foundation',
          category: 'Face',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCppEoHwC9gTV_1OOe9hu9DnUCb5PmozMRWg&s',
          description: 'A lightweight, high-coverage liquid foundation that offers a matte, second-skin effect lasting up to 24 hours.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 6.79 },
            { store: store2.id, price: 6.99 },
            { store: store4.id, price: 6.59 },
            { store: store5.id, price: 7.99 }
          ],
          comments: [
            {
              author: user1.id,
              text: 'Amazing product!',
              date: new Date()
            }
          ]
        }),
        Product.create({
          name: 'Maybelline Fit Me Matte & Poreless Foundation',
          category: 'Face',
          image: 'https://m.media-amazon.com/images/I/51jVur23b+L.jpg',
          description: 'Designed for normal to oily skin, this foundation minimizes pores and provides a natural matte finish. Available in a wide shade range.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 6.25 },
            { store: store2.id, price: 6.99 },
            { store: store4.id, price: 6.09 },
            { store: store5.id, price: 8 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Essence Máscara Pestañas I Love Extreme Crazy',
          category: 'Eyes',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HcJkDzRkJZbnYoAOsPQmOZcsEUfssgmfeQ&s',
          description: 'A budget-friendly mascara that delivers intense volume with its spiral-shaped brush to coat every lash.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 3.59 },
            { store: store2.id, price: 3.59 },
            { store: store4.id, price: 3.99 },
            { store: store5.id, price: 3.49 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Revolution Paleta sombras Reloaded Velvet Rose',
          category: 'Eyes',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsJsUCJ7K_a9I5_t3O5se5oer_ZP8aT3unw&s',
          description: 'A 15-shade palette featuring a mix of matte and metallic finishes, perfect for creating both daytime and nighttime looks.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 6.99 },
            { store: store2.id, price: 6.99 },
            { store: store4.id, price: 5.09 },
            { store: store5.id, price: 6.99 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Essence Lash Princess False Lash Effect Mascara',
          category: 'Eyes',
          image: 'https://i.makeup.es/0/0h/0hgy9s4xcbdo.jpg',
          description: 'Known for its ability to lengthen and volumize lashes, giving a dramatic “false lash” appearance.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 2.98 },
            { store: store2.id, price: 3 },
            { store: store4.id, price: 4.19 },
            { store: store5.id, price: 4.19 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Milani Baked Blush',
          category: 'Cheeks',
          image: 'https://www.maquillalia.com/images/productos/milani-colorete-baked-05-luminoso-4-15322.jpeg',
          description: 'A baked blush with vibrant color and a subtle shimmer for a radiant, natural-looking finish.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store5.id, price: 13.95 }
          ],
          comments: []
        }),
        Product.create({
          name: 'L\'Oréal Paris Infallible Fresh Wear Foundation (L\'Oréal)',
          category: 'Face',
          image: 'https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/YZ8AAOSwRrJg6a1m/$_57.JPG?set_id=8800005007',
          description: 'A long-lasting, sweat-proof, and water-resistant foundation that provides medium-to-full coverage with a fresh, natural finish.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 14.99 },
            { store: store2.id, price: 10.45 },
            { store: store4.id, price: 10.99 },
            { store: store5.id, price: 15.45 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Estée Lauder Double Wear Stay In Place SPF10',
          category: 'Face',
          image: 'https://www.maquillalia.com/images/productos/estee-lauder-base-de-maquillaje-double-wear-stay-in-place-spf10-1w2-sand-3-82236.jpeg',
          description: 'An iconic full-coverage foundation that provides a flawless finish and stays in place through heat, sweat, and humidity.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 31.90 },
            { store: store2.id, price: 29.9 },
            { store: store3.id, price: 40 },
            { store: store4.id, price: 29.99 },
            { store: store5.id, price: 38.99 },
            { store: store6.id, price: 39.35 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Dior Addict Lip Glow (Dior)',
          category: 'Lips',
          image: 'https://static.sweetcare.com/img/prd/488/v-638200521133392690/dior-014890di-1.webp',
          description: 'A hydrating lip balm that reacts with the pH of your lips to create a custom natural-looking tint.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 36 },
            { store: store2.id, price: 36 },
            { store: store3.id, price: 47.99 },
            { store: store4.id, price: 39.99 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Nabla Polvos Compactos Close Up',
          category: 'Face',
          image: 'https://www.beautikcanarias.com/159918-superlarge_default/nabla-close-up-smoothing-pressed-powder.jpg',
          description: 'Ultra-fine compact powder that sets makeup, reduces the appearance of pores, and provides a matte finish without drying out the skin.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store5.id, price: 25 },
            { store: store6.id, price: 25.5 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Dior Diorshow On Stage Crayon Waterproof Kohl Liner',
          category: 'Eyes',
          image: 'https://d1flfk77wl2xk4.cloudfront.net/Assets/17/561/XL_p0209056117.jpg',
          description: 'A waterproof eyeliner with intense pigments, ideal for creating precise lines or long-lasting smoky looks.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 28 },
            { store: store2.id, price: 28 },
            { store: store3.id, price: 35 },
            { store: store4.id, price: 28.99 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Anastasia Beverly Hills Dipbrow Pomade',
          category: 'Brows',
          image: 'https://www.sephora.es/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw11e877cd/images/hi-res/PID_principal/PID_principal_2/P2678015_principal.jpg?sw=585&sh=585&sm=fit',
          description: 'A long-lasting, waterproof brow pomade that allows precise filling and shaping of brows.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store3.id, price: 32.99 },
            { store: store4.id, price: 34.89 },
            { store: store6.id, price: 23.5 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Fenty Beauty Pro Filt\'r Soft Matte Longwear Foundation',
          category: 'Face',
          image: 'https://i.pinimg.com/736x/66/a5/45/66a545923244976d9443ecbecded7b22.jpg',
          description: 'A liquid foundation that delivers long-lasting wear with a soft matte finish. It provides buildable medium to full coverage.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store3.id, price: 39.99 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Clinique Pop Lip Colour',
          category: 'Lips',
          image: 'https://cdn.basler-beauty.de/out/pictures/generated/product/1/980_980_100/2010178-01-Nude-Pop-3-9-g.77cc77ff.jpg',
          description: 'A creamy lipstick that combines rich, long-wearing color with hydration for a comfortable finish.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 15.9 },
            { store: store2.id, price: 17.98 },
            { store: store3.id, price: 23 },
            { store: store5.id, price: 24.95 },
            { store: store6.id, price: 26.5 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Yves Saint Laurent Touche Éclat Radiant Touch',
          category: 'Cheeks',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3VM_O6cy_yS0AbpXp05Ufghjvf6Eq7Mi2Q&s',
          description: 'A cult-favorite highlighting pen that brightens dark areas and adds a natural radiance to the skin.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 29 },
            { store: store2.id, price: 25 },
            { store: store3.id, price: 30 },
            { store: store4.id, price: 22.99 },
          ],
          comments: []
        }),
        Product.create({
          name: 'Uran Decay All Nighter Setting Spray',
          category: 'Face',
          image: 'https://cdn.cosmostore.org/cache/front/shop/products/136/326319/350x350.jpg',
          description: 'A long-lasting makeup setting spray designed to lock in your look for up to 16 hours without fading, smudging, or settling into fine lines. Its lightweight, oil-free formula keeps makeup fresh while maintaining a natural finish, suitable for all skin types.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 24.94 },
            { store: store2.id, price: 24.95 },
            { store: store3.id, price: 35.99 },
            { store: store4.id, price: 24.99 },
          ],
          comments: []
        }),
        Product.create({
          name: 'W7 Paleta de sombras On the Rocks',
          category: 'Eyes',
          image: 'https://www.maquillalia.com/images/productos/w7-paleta-de-sombras-on-the-rocks-1-34929.jpeg',
          description: '14 highly pigmented shades, ranging from cool-toned neutrals to bold greens and golds. With a mix of matte and shimmer finishes, this versatile palette is perfect for creating both everyday and dramatic looks.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 4.99 },
            { store: store3.id, price: 4.99 },
          ],
          comments: []
        }),
        Product.create({
          name: 'Maybelline Superstay ink crayon',
          category: 'Lips',
          image: 'https://i.ebayimg.com/images/g/7HUAAOSwX59fZ2CM/s-l1200.jpg',
          description: 'It\'s a long-lasting, smudge-proof lipstick in a convenient crayon format. Its creamy formula glides on smoothly for precise application and delivers vibrant, matte color that lasts up to 8 hours. Perfect for on-the-go touch-ups!',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 6.24 },
            { store: store2.id, price: 6.25 },
            { store: store3.id, price: 8.29 },
            { store: store4.id, price: 9.49 }
          ],
          comments: []
        })
      ])
    })
  })
  .catch(console.error)
  .finally(() => db.disconnect())