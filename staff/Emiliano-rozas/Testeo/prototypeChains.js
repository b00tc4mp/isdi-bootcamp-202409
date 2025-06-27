function User(name, age) {
    this.name = name
    this.age = age
    this.friends = []
}

User.prototype.addFriend = function (usuario) {
    this.friends.push(usuario)
}

User.prototype.listFriends = function () {
    var friendsnames = this.name.map(function (friend) { friend.name })
    console.log(this.name + " is friends of" + friendsnames.join(","))
}


const user1 = new User('Alice', 25);
const user2 = new User('Bob', 30);
const user3 = new User('juan', 29);
const user4 = new User('marta', 32);

user1.addFriend(user3)
user1.listFriends();

////////////////////////////////////////

function Car(brand, fuel, mileage) {
    this.brand = brand
    this.fuel = fuel
    this.mileage = mileage
}

Car.prototype.drive = function (go) {
    try {
        this.fuel -= go
        this.mileage += go
        if (this.fuel < 0) {
            throw new Error("te quedaste sin nafta maquina")
        }
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

Car.prototype.refuel = function (reload) {
    this.fuel += reload
}

const car1 = new Car('Toyota', 50, 0);
car1.drive(100);
car1.refuel(20);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Vehicle(type, fuel, km) {
    this.type = type;
    this.fuel = fuel;
    this.km = km;
}

// Condicion de manejo universal, luego particularizamos llamando a la funcion en cada caso

Vehicle.prototype.drive = function (go, consumo) {
    try {
        this.fuel -= parseInt(go / consumo)
        this.km += go
        if (this.fuel < 0) {
            throw new Error("te quedaste sin nafta maquina")
        }
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

}

//funcion de recarga humilde

Vehicle.prototype.refuel = function (reload) {
    this.fuel += reload
}


// Aca creamos el auto y lo vinculamos con omega

function Car(type, fuel, km) {
    Vehicle.call(this, type, fuel, km)
    this.category = "auto"
}

Car.prototype = Object.create(Vehicle.prototype)
Car.prototype.constructor = Car

//Aca la condicion de drive especifica para el auto

Car.prototype.drive = function (go) {
    Vehicle.prototype.drive.call(this, go, 10)

}

// creamos las motos y se vinculan con omega

function Motorcycle(type, fuel, km) {
    Vehicle.call(this, type, fuel, km);
    this.category = "moto"
}

Motorcycle.prototype = Object.create(Vehicle.prototype)
Motorcycle.prototype.constructor = Motorcycle

//condicion de consumo especifica para la moto

Motorcycle.prototype.drive = function (go) {
    Vehicle.prototype.drive.call(this, go, 15)

}


var auto = new Car('Toyota', 50, 0);
var moto = new Motorcycle('Honda', 50, 0);

auto.drive(100);
moto.drive(100);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Account = function (owner, balance) {
    this.owner = owner;
    this.balance = balance
}

Account.prototype.deposit = function (amount) {
    this.balance += amount
}

Account.prototype.withdraw = function (amount) {
    this.balance -= amount
}

Account.prototype.checkBalance = function () {
    console.log(this.balance)
}

var account1 = new Account("Io", 1000)

account1.deposit(500);
account1.withdraw(300);
account1.checkBalance();

