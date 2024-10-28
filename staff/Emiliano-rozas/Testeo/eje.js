// escribe tu respuesta acá
function contrasenaValida(contraseña) {
    if (contraseña === "2Fj(jjbFsuj" || contraseña === "eoZiugBf&g9") {
        return true
    } else
        return false
}


// código de prueba
console.log(contrasenaValida("2Fj(jjbFsuj")) // true
console.log(contrasenaValida("eoZiugBf&g9")) // true
console.log(contrasenaValida("hola")) // false
console.log(contrasenaValuda("")) // false


function calcularImpuestos(edad, ingresos) {
    if (edad >= 18 && ingresos >= 1000) {
        return ingresos * 0.4
    }
    else {
        return 0
    }
}


function bmi(peso, altura) {
    let formula = peso / altura ^ 2
    if (formula < 18.5) {
        return "Bajo de peso"
    } else if (18.5 > formula < 24.9) {
        return "Normal"
    }
    else if (25 > formula < 29.9) {
        return "Sobrepeso"
    }
    else {
        return "obeso"
    }