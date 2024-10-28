function User(email, name) {
    this.email = email;
    this.name = name;
    this.online = false;
}

User.prototype.login = function () {
    this.online = true;
    console.log(this.name + "Has logged in!")

}
User.prototype.logout = function () {
    this.online = false;
    console.log(this.name + " Has logged out!")

}

function Admin(...args) {
    User.apply(this, args);
    this.role = "Super Admin";
}

Admin.prototype = Object.create(User.prototype)

Admin.prototype.deleteUser = function (u) {
    users = users.filter(function (user) {
        return user.email != u.email
    })
}



var userOne = new User("mailfalso@gmail.com", "Chachi ");
var userTwo = new User("mailfalso32@gmail.com ", "Piruli ");
var admin = new Admin("elmascapo@ronga", "x-men")

var users = [userOne, userTwo, admin]

console.log(userOne)
userTwo.login()