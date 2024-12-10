import logic from "../../../logic/index.js";

import { createFunctionalHandler } from "../../helpers/index.js";

export default createFunctionalHandler((req, res) => {
    const { userId } = req; // Esto viene del token
    const { username } = req.params; // Esto viene de la URL

    return logic.getUserByUserame(userId, username)
        .then(userId => res.json(userId))
        .catch(error => {
            console.error('Error in findUserByUsernameHandler:', error.message);
            throw error;
        });
})