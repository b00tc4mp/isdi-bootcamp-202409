const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '') //uuid = universally unique identifier
/* function used to generate ID users w/ a random string without decimals:
    //Date.now() -> milisecs since 1970
    //Math.random() -> random num 0-0.9
    //Sum -> unique and large num on each execution
    //.toString(36) -> converts that num into a string using a base-36 representation (digits 0-9 & letters a-z)
    //.replace('.', '') -> removes any dot that might appear if there's a decimal
*/