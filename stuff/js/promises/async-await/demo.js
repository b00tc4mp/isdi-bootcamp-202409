async function add(a, b) { return a + b }

add(1, 2)
    .then(console.log)
    .catch(console.error)
//3

// same as

function add(a, b) {
    return new Promise((resolve, reject) => {
        try {
            resolve(a + b)
        } catch (error) {
            reject(error)
        }
    })
}

add(1, 2)
    .then(console.log)
    .catch(console.error)
//3

const result = await add(1, 2)
console.log(result)
//3