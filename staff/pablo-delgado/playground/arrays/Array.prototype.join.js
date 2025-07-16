console.log('TEST Array.prototype.join')

console.log('CASE join elements')

var exoticAnimals = ['quokka', 'lion', 'wombat']
var joined = exoticAnimals.join()
console.log(joined)
// 'quokka

console.log('CASE join elements with #')

var exoticAnimals = ['quokka', 'lion', 'wombat']
var joined = exoticAnimals.join(' ')
console.log(joined)
//quokka lion wombat