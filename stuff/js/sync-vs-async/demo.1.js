console.log(new Date().toISOString(), 'start')

setTimeout(() => console.log(new Date().toISOString(), '... 1'), 5000)
setTimeout(() => console.log(new Date().toISOString(), '... 2'), 1000)

const before = Date.now()
//while (Date.now() - before < 10000);
for (; Date.now() - before < 3000;);

console.log(new Date().toISOString(), 'end')