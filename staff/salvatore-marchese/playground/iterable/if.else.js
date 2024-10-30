//function if/else  

/* we established a value to a variable and the function will react to the value. in this case limiting an age limit. if the variable is <18 we are not allowed, >= 18 we are allowed.
*/


let age = 11 

if (age >= 18 ) {
        console.log("you are old enough to enter this site");
}
else{
    console.log("you must be 18+ to enter this site");
}

console.log(age)



// example#2

let time = 9;

if (time < 12) {
    console.log('good morning!');
}
else {
    console.log('good afternoon!');
}

console.log(time)

//example#3

let isStudent = false; /*or true; choose the value to the variable, the function will pick the answer when called the variable console.log(isStudent)*/

if(isStudent) {
    console.log('you are a student');
}
else {
    console.log('you are not a student');
}

console.log(isStudent)


//example#4

/* examble of 'if/else inside of a if/else'. giving two variables with different values that reacts to the two functions.
*/

let age = 17;
let hasLicense = false;

if(age >= 18){
    console.log('you are old enough to drive');
    if(hasLicense){
        console.log('you have your license');
    }
    else {
        console.log('you do not have a license yet!');
    }
}
else {
    console.log('you must be 18+ to have a driving license');
}



