const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo']; // le das un valor y te devuelve la posicion 

var index = animals.lastIndexOf('Dodo',2)
console.log(index) // aqui le dices desde la posicion 2 buscame si hay algun  Dodo, la diferencia es que la recorre hacia atras no hacia adelante, como en la posicion dos hacia atras esta Dodo pues da 0 ya que hay un dodo en el 0
//0

var index = animals.lastIndexOf('Tiger',0)
console.log(index)
// -1  da -1 ya que desde la posicion 0 hacia atras no hay ningun tiger

var index = animals.lastIndexOf('Tiger', -2)
console.log(index) // 1