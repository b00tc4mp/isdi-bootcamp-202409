export default () => {
    const token = localStorage.getItem('token');
    console.log("Is user logged in? Token:", token);

    if (!token) return false;

    try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
        if (decoded.exp * 1000 < Date.now()) {
            console.log("Token expirado, eliminando...");
            localStorage.removeItem("token"); // Borra el token caducado
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token"); // Si el token es inválido, lo eliminamos
        return false;
    }
};
