var Raid = function () {
    this.length = 0;
}

Raid.prototype.join = function () {
    var newStr = '';
    var str = '';
    if (typeof arguments[0] === "string") {
        str = arguments[0];
    }

    for (var i = 0; i < this.length; i++) {
        newStr+= this[i];
        if (str === arguments[0]) {
            newStr += str;
        };
    };

    return newStr;
};

console.log("TEST Raid.prototype.join");

console.log("CASE combine iterable elements into a string");

var obj = new Raid;
obj[0] = "Let's";
obj[1] = "play";
obj[2] = "mario";
obj[3] = "kart";
obj.length = 4

var result = obj.join(" ");
console.log(result);
