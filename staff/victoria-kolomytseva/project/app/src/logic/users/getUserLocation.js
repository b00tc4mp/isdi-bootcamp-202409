export default () => {
    return new Promise((resolve, reject) => {
        const successCallback = (position) => {
            resolve(position); // Devuelve los datos obtenidos
        };

        const errorCallback = (error) => {
            reject(error); // Maneja el error
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });
};
