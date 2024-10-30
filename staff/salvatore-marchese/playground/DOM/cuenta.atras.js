function cuentaAtras (n) {
    if (n === 0) {
        console.log('Despegue!')
    }
    console.log(n)
    cuentaAtras(n - 1)
}

cuentaAtras(10)


//return 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 