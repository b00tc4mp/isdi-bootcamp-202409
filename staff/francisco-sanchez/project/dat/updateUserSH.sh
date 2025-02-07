#To update user with random data
db.users.updateOne(
  { _id: ObjectId('6762dba622333bfc20ee5487') },
  {
    $set: {
      dni: Math.floor(10000000 + Math.random() * 90000000) + 'A',
      surname1: "Doe",
      surname2: "Smith",
      biography: "This is a randomly generated biography.",
      country: "RandomCountry",
      province: "RandomProvince",
      city: "RandomCity",
      postalCode: Math.floor(10000 + Math.random() * 90000).toString(),
      number: Math.floor(Math.random() * 100).toString(),
      flat: Math.floor(Math.random() * 10),
      legalName: "Random Legal Name",
      website: "https://randomwebsite.com"
    }
  }
)

#To update some data on a user
db.users.updateOne(
  { _id: ObjectId('6762dba622333bfc20ee5487') },
  {
    $set: {
      address1: 'Street for the customer 1',
      address2: 'More information about adress'
    }
  }
)

# To see active packs
db.packs.find({timerActivated: { $ne: null } })