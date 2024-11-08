function setTimeoutSync(handler, timeout) {
    const before = Date.now()
    while (Date.now() - before < timeout);

    handler()
}

console.log(new Date().toISOString(), 'start')

setTimeout(() => console.log(new Date().toISOString(), '... 1'), 1000)

setTimeoutSync(() => console.log(new Date().toISOString(), '... 2'), 3000)

console.log(new Date().toISOString(), 'end')