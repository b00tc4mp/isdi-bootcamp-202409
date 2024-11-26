var before = Date.now()
var elapsedTime = () => (Date.now() - before) / 1000

new Promise((resolve, reject) => setTimeout(() => Math.random() > 0.5 ? resolve(elapsedTime()) : reject(elapsedTime()), 1500))
    .then(console.log)
    .catch(console.error)

// Promise {
//     <pending>}
//         1.502
