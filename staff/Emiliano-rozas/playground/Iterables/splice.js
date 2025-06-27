var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June' };


months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]


var splice = function (iterable, start) {
    var result = { length: 0 };
    if (start < 0) {
        start = iterable.length + start;
    }
    for (var i = 0; i < start; i++) {
        result[result.length] = iterable[i];
        result.length++;
    }
}
