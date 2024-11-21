mongodb

```sh
🐖 cd workspace/mongodb-macos-aarch64-8.0.3 
🐖 tree
.
├── LICENSE-Community.txt
├── MPL-2
├── README
├── THIRD-PARTY-NOTICES
├── bin
│   ├── install_compass
│   ├── mongod
│   └── mongos
└── macos_mongodb.plist

2 directories, 8 files
🐖 mkdir data
🐖 tree
.
├── LICENSE-Community.txt
├── MPL-2
├── README
├── THIRD-PARTY-NOTICES
├── bin
│   ├── install_compass
│   ├── mongod
│   └── mongos
├── data
└── macos_mongodb.plist

3 directories, 8 files
🐖 ./bin/mongod --dbpath data
```

mongosh

```sh
🐖 cd mongosh-2.3.3-darwin-arm64 
🐖 pwd
/Users/manuelbarzi/workspace/mongosh-2.3.3-darwin-arm64
🐖 tree
.
├── LICENSE-crypt-library
├── LICENSE-mongosh
├── README
├── THIRD_PARTY_NOTICES
├── bin
│   ├── mongosh
│   └── mongosh_crypt_v1.dylib
└── mongosh.1.gz

2 directories, 7 files
🐖 ./bin/mongosh
...
test>
```

inside mongosh

```sh
test> show databases
admin   40.00 KiB
config  12.00 KiB
local   40.00 KiB

test> use unsocial
switched to db unsocial

unsocial> db.users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('672c9e573dbfe92085400b86')
}
unsocial> show collections
users
unsocial> db.users.find()
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  }
]
unsocial> db.users.insertOne({ name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('672c9f413dbfe92085400b87')
}
unsocial> db.users.fin()
TypeError: db.users.fin is not a function
unsocial> db.users.find()
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('672c9f413dbfe92085400b87'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
unsocial>

unsocial> db.users.insertOne({ name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('672ca07a3dbfe92085400b88')
}
unsocial> db.users.find()
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('672c9f413dbfe92085400b87'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  },
  {
    _id: ObjectId('672ca07a3dbfe92085400b88'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
unsocial> db.users.deleteOne({ _id: ObjectId('672ca07a3dbfe92085400b88') })
{ acknowledged: true, deletedCount: 1 }
unsocial> db.users.find()
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('672c9f413dbfe92085400b87'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  }
]
unsocial> 

unsocial> db.users.createIndex({ email: 1 }, { unique: true })
email_1
unsocial> 

unsocial> db.users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo2', password: '123123123' })
MongoServerError: E11000 duplicate key error collection: unsocial.users index: email_1 dup key: { email: "pepito@grillo.com" }
unsocial> 

unsocial> db.users.createIndex({ username: 1 }, { unique: true })
username_1
unsocial> db.users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo2.com', username: 'pepitogrillo', password: '123123123' })
MongoServerError: E11000 duplicate key error collection: unsocial.users index: username_1 dup key: { username: "pepitogrillo" }
unsocial> 

unsocial> db.users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('672ca3ae3dbfe92085400b8b')
}
unsocial> db.users.insertOne({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: '123123123' })
{
  acknowledged: true,
  insertedId: ObjectId('672ca3dd3dbfe92085400b8c')
}
unsocial> db.users.find()
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('672c9f413dbfe92085400b87'),
    name: 'Campa Nilla',
    email: 'campa@nilla.com',
    username: 'campanilla',
    password: '123123123'
  },
  {
    _id: ObjectId('672ca3ae3dbfe92085400b8b'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('672ca3dd3dbfe92085400b8c'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  }
]
unsocial> 

unsocial> db.users.find({ name: /e/ })
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('672ca3ae3dbfe92085400b8b'),
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    username: 'wendydarling',
    password: '123123123'
  },
  {
    _id: ObjectId('672ca3dd3dbfe92085400b8c'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  }
]
unsocial> 

unsocial> db.users.find({ name: /P/ })
[
  {
    _id: ObjectId('672c9e573dbfe92085400b86'),
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    username: 'pepitogrillo',
    password: '123123123'
  },
  {
    _id: ObjectId('672ca3dd3dbfe92085400b8c'),
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
  }
]
unsocial> 

unsocial> db.users.updateOne({ _id: ObjectId('672ca3dd3dbfe92085400b8c') }, { $set: { password: '234234234' } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
unsocial> db.users.findOne({ _id: ObjectId('672ca3dd3dbfe92085400b8c') })
{
  _id: ObjectId('672ca3dd3dbfe92085400b8c'),
  name: 'Peter Pan',
  email: 'peter@pan.com',
  username: 'peterpan',
  password: '234234234'
}
unsocial> 


unsocial> db.posts.insertOne({ author: ObjectId('672ca3dd3dbfe92085400b8c'), image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', text: 'my place <3 (promo code: PATA2024)', date: ISODate('2024-10-30T13:06:39.922Z'), likes: [], comments: [] }) 
{
  acknowledged: true,
  insertedId: ObjectId('672ca7a73dbfe92085400b8d')
}
unsocial> db.posts.find()
[
  {
    _id: ObjectId('672ca7a73dbfe92085400b8d'),
    author: ObjectId('672ca3dd3dbfe92085400b8c'),
    image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg',
    text: 'my place <3 (promo code: PATA2024)',
    date: ISODate('2024-10-30T13:06:39.922Z'),
    likes: [],
    comments: []
  }
]
unsocial> 

unsocial> db.posts.find()
[
  {
    _id: ObjectId('672ca7a73dbfe92085400b8d'),
    author: ObjectId('672ca3dd3dbfe92085400b8c'),
    image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg',
    text: 'my place <3 (promo code: PATA2024)',
    date: ISODate('2024-10-30T13:06:39.922Z'),
    likes: [],
    comments: []
  }
]
unsocial> db.posts.updateOne({ _id: ObjectId('672ca7a73dbfe92085400b8d') }, { $push: { likes: ObjectId('672ca3ae3dbfe92085400b8b') } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
unsocial> db.posts.find()
[
  {
    _id: ObjectId('672ca7a73dbfe92085400b8d'),
    author: ObjectId('672ca3dd3dbfe92085400b8c'),
    image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg',
    text: 'my place <3 (promo code: PATA2024)',
    date: ISODate('2024-10-30T13:06:39.922Z'),
    likes: [ ObjectId('672ca3ae3dbfe92085400b8b') ],
    comments: []
  }
]

unsocial> db.posts.updateOne({ _id: ObjectId('672ca7a73dbfe92085400b8d') }, { $push: { likes: ObjectId('672c9e573dbfe92085400b86') } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
unsocial> db.posts.find()
[
  {
    _id: ObjectId('672ca7a73dbfe92085400b8d'),
    author: ObjectId('672ca3dd3dbfe92085400b8c'),
    image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg',
    text: 'my place <3 (promo code: PATA2024)',
    date: ISODate('2024-10-30T13:06:39.922Z'),
    likes: [
      ObjectId('672ca3ae3dbfe92085400b8b'),
      ObjectId('672c9e573dbfe92085400b86')
    ],
    comments: []
  }
]

unsocial> db.posts.updateOne({ _id: ObjectId('672ca7a73dbfe92085400b8d') }, { $pull: { likes: ObjectId('672c9e573dbfe92085400b86') } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
unsocial> db.posts.find()
[
  {
    _id: ObjectId('672ca7a73dbfe92085400b8d'),
    author: ObjectId('672ca3dd3dbfe92085400b8c'),
    image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg',
    text: 'my place <3 (promo code: PATA2024)',
    date: ISODate('2024-10-30T13:06:39.922Z'),
    likes: [ ObjectId('672ca3ae3dbfe92085400b8b') ],
    comments: []
  }
]

unsocial> db.posts.updateOne({ _id: ObjectId('672ca7a73dbfe92085400b8d') }, { $push: { comments: { _id: ObjectId(), author: ObjectId('672ca3dd3dbfe92085400b8c'), text: 'Oh, so nice, i want to be there!', date: ISODate('2024-11-05T11:54:44.173Z') } } })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
unsocial> db.posts.find()
[
  {
    _id: ObjectId('672ca7a73dbfe92085400b8d'),
    author: ObjectId('672ca3dd3dbfe92085400b8c'),
    image: 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg',
    text: 'my place <3 (promo code: PATA2024)',
    date: ISODate('2024-10-30T13:06:39.922Z'),
    likes: [ ObjectId('672ca3ae3dbfe92085400b8b') ],
    comments: [
      {
        _id: ObjectId('672ca9af3dbfe92085400b8e'),
        author: ObjectId('672ca3dd3dbfe92085400b8c'),
        text: 'Oh, so nice, i want to be there!',
        date: ISODate('2024-11-05T11:54:44.173Z')
      }
    ]
  }
]
unsocial> 
```

install mongodb driver for node in dat package

```sh
🐖 pwd                                
/Users/manuelbarzi/workspace/isdi-bootcamp-202409/staff/manuel-barzi/unsocial/dat
🐖 npm init --yes
Wrote to /Users/manuelbarzi/workspace/isdi-bootcamp-202409/staff/manuel-barzi/unsocial/dat/package.json:

{
  "name": "dat",
  "version": "1.0.0",
  "description": "mongodb",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


🐖 npm i mongodb

added 12 packages, and audited 13 packages in 2s

found 0 vulnerabilities
```