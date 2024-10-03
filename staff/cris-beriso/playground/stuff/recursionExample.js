function cuentaAtras(n) {
    if (n === 0) {
        console.log('Despegue!!')
        return;
    }
    console.log(n);
    cuentaAtras(n - 1);
}

cuentaAtras(10);