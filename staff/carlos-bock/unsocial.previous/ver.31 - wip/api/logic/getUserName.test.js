import getUserName from './getUserName.js';

try {
    console.log(getUserName('m2vvw4xzn6d','m2x81mske0o')); //segundo parametro falta en código original, all poner un string aleatorio cause un error esperado;
} catch (error) {
    console.error(error);
}