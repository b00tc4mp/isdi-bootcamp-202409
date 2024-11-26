new Promise((resolve, reject) => resolve(10))
    .then(res => res + 10)
    .then(res => res + 10)
    .then(res => { throw new Error(res) })
    .then(res => res + 10)
    .catch(error => { console.error(error); return 10 })
    .then(res => res + 10)
    .then(res => { console.log(res); return Promise.resolve(10).then(res => res + 10).then(res => res + 10) })
    .then(res => res + 10)
    .then(res => console.log(res))
    .catch(error => { console.error(error); return 10 })
    .then(res => { console.log(res); return Promise.resolve(10).then(res => res / 10) })
    .then(res => res + 10)
    .then(res => console.log(res))
    .catch(error => { console.error(error); return 10 })

// VM832:6 Error: 30
//     at <anonymous>:4:26
// (anonymous) @ VM832:6
// Promise.catch
// (anonymous) @ VM832:6
// VM832:8 20
// VM832:10 40
// VM832:12 undefined
// VM832:14 11