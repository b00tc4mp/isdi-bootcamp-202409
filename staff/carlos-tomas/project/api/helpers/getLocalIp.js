const os = require('os');

function getLocalIp() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];

        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address; // Retorna la IP local no interna
            }
        }
    }

    return '127.0.0.1'; // Retorna localhost si no encuentra una IP local
}

module.exports = getLocalIp;
