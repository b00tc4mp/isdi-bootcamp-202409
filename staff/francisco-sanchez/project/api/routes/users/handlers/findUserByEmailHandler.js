import logic from "../../../logic/index.js";

import { createFunctionalHandler } from "../../helpers/index.js";

export default createFunctionalHandler((req, res) => {
    const { userId } = req; // Esto viene del token
    const { email } = req.params; // Esto viene de la URL

    return logic.getUserByEmail(userId, email)
        .then(userId => res.json(userId))
        .catch(error => {
            console.error('Error in findUserByEmailHandler:', error.message);
            throw error;
        });
})