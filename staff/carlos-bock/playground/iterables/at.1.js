// if index > arr.length  return undefined;
// if positive logic 
// if negative other logic 
//for iratables


function at(arr, index){
    if (index > arr.length || arr.length > - index) return undefined
    else if(index > -1){
        return arr[Math.floor(index)];
    } else if(index < 0){
        return arr[arr.length + Math.ceil(index)];
    } else return "parameter is not a number";
}


const obj1 = {0: 3, 1: null, 2: true, 3: "a", 4: 1, length: 5};

console.log(at(obj1, 3));


