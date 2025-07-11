export default () => {
    const token = localStorage.getItem('token');
    console.log("Is user logged in? Token:", token);

    if (!token) return false;

    try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodes the JWT payload
        if (decoded.exp * 1000 < Date.now()) {
            console.log("Token expired, removing...");
            localStorage.removeItem("token"); // Deletes the expired token
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error decoding the token:", error);
        localStorage.removeItem("token"); // If the token is invalid, remove it
        return false;
    }
};