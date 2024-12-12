import 'dotenv/config'

import bcrypt from 'bcryptjs'

import db, { User, Product, Store, StorePrice, Comment, Location } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([
    User.deleteMany(),
    Product.deleteMany(),
    Store.deleteMany(),
    StorePrice.deleteMany(),
    Comment.deleteMany(),
    Location.deleteMany()
  ]))
  .then(() => {
    return Promise.all([
      User.create({ name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: bcrypt.hashSync('criscris', 10), role: 'admin' }),
      User.create({ name: 'Yannick', email: 'yan@nick.com', username: 'yanickscf', password: bcrypt.hashSync('criscris', 10), role: 'regular' }),
      User.create({ name: 'Cofy', email: 'cofy@dog.com', username: 'cofythedog', password: bcrypt.hashSync('criscris', 10), role: 'regular' })
    ]);
  })
  .then(([user1]) => {
    return Promise.all([
      Store.create({
        name: 'Perfumerías Primor',
        web: 'https://www.primor.eu/es_es/',
        locations: [
          {
            address: 'Calle de Aragón, 123, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3851, 2.1734]
            }
          },
          {
            address: 'Calle de Balmes, 456, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3872, 2.157]
            }
          },
          {
            address: 'Gran Vía, 789, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3779, 2.1826]
            }
          },
          {
            address: 'Avenida Diagonal 208, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.4044, 2.1968]
            }
          },
          {
            address: 'Avenida del Portal de l\'Àngel 40, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3854, 2.1737]
            }
          },
          {
            address: 'Calle Pelai 10, Barcelona, España',
            location: {
              type: 'Point',
              coord: [40.7128, 2.1649]
            }
          },
          {
            address: 'Moll d\'Espanya 5, Local 8/15/16, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3733, 2.1843]
            }
          },
          {
            address: 'Calle de Potosí 2, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.4377, 2.1944]
            }
          }
        ]
      }),
      Store.create({
        name: 'Druni',
        web: 'https://www.druni.es/',
        locations: [
          {
            address: 'Carrer de Pelayo, 7, 09001, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3855, 2.1657]
            }
          },
          {
            address: 'Carrer Pelai, 24, 08001, Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3858, 2.1661]
            }
          },
          {
            address: 'Carrer de la Portaferrissa, 13, 08002 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3839, 2.1735]
            }
          },
          {
            address: 'Moll d\'Espanya, 5, 08039 Barcelona (Centro Comercial Maremagnum), España',
            location: {
              type: 'Point',
              coord: [41.3743, 2.1836]
            }
          },
          {
            address: 'Gran Via de les Corts Catalanes, 373, 08015 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3795, 2.1443]
            }
          },
          {
            address: 'Avinguda Diagonal, 208, 08018 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3989, 2.1918]
            }
          },
          {
            address: 'Avinguda de Rio de Janeiro, 42, 08016 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.4368, 2.1795]
            }
          },
          {
            address: 'Avinguda Diagonal, 3, 08019 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.4075, 2.2044]
            }
          }
        ]
      }),
      Store.create({
        name: 'Sephora',
        web: 'https://www.sephora.es/',
        locations: [
          {
            address: 'Plaça Catalunya, 1-4, 08002 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3869, 2.1701]
            }
          },
          {
            address: 'Paseo de Gracia, 37, 08007 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3915, 2.1655]
            }
          },
          {
            address: 'Rambla de Cataluña, 121, 08008 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3922, 2.1629]
            }
          },
          {
            address: 'Calle Tarragona, 89, 08015 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3754, 2.1491]
            }
          },
          {
            address: 'Avenida Diagonal, 208 (C.C. Glòries), 08018 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.4065, 2.1918]
            }
          },
          {
            address: 'Avenida Diagonal, 617 (El Corte Inglés Diagonal), 08028 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.3912, 2.1315]
            }
          },
          {
            address: 'Calle Josep Pla, 2 (C.C. Diagonal Mar), 08019 Barcelona, España',
            location: {
              type: 'Point',
              coord: [41.4094, 2.2166]
            }
          },
          {
            address: 'Calle Literatura, 1-3 (C.C. Gran Via 2), 08908 L\'Hospitalet de Llobregat, España',
            location: {
              type: 'Point',
              coord: [41.3547, 2.1244]
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

    ]).then(([store1, store2, store3, store4, store5]) => {
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
            { store: store4.id, price: 7.99 }
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
            { store: store4.id, price: 8 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Essence Máscara Pestañas I Love Crazy',
          category: 'Eyes',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HcJkDzRkJZbnYoAOsPQmOZcsEUfssgmfeQ&s',
          description: 'A budget-friendly mascara that delivers intense volume with its spiral-shaped brush to coat every lash.',
          likes: [],
          dislikes: [],
          storePrices: [
            { store: store1.id, price: 3.59 },
            { store: store2.id, price: 3.59 },
            { store: store4.id, price: 3.49 }
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
            { store: store4.id, price: 6.99 }
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
            { store: store4.id, price: 4.19 }
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
            { store: store4.id, price: 13.95 }
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
            { store: store4.id, price: 15.45 }
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
            { store: store4.id, price: 38.99 },
            { store: store5.id, price: 39.35 }
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
            { store: store3.id, price: 47.99 }
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
            { store: store4.id, price: 25 },
            { store: store5.id, price: 25.5 }
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
            { store: store3.id, price: 35 }
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
            { store: store5.id, price: 23.5 }
          ],
          comments: []
        }),
        Product.create({
          name: 'Fenty Beauty Pro Filt\'r Soft Matte Longwear Foundation',
          category: 'Eyes',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HcJkDzRkJZbnYoAOsPQmOZcsEUfssgmfeQ&s',
          description: 'A budget-friendly mascara that delivers intense volume with its spiral-shaped brush to coat every lash.',
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
            { store: store4.id, price: 24.95 },
            { store: store5.id, price: 26.5 }
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
            { store: store3.id, price: 30 }
          ],
          comments: []
        })
      ])
    })
  })
  .catch(console.error)
  .finally(() => db.disconnect())