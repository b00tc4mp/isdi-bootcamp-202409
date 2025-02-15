import { validate, errors } from 'com';
import { extractPayloadFromJWT } from '../../util/index.js';

const { SystemError } = errors;

export default (logbookId, { date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes }) => {
    validate.id(logbookId, 'logbookId');
    validate.date(new Date(date));
    validate.depth(depth);
    validate.time(time);
    validate.weather(weather);
    validate.temperature(temperature);
    validate.visibility(visibility);
    validate.waves(waves);
    validate.wetSuit(wetSuit);
    validate.weight(weight);
    validate.tankSize(tankSize);
    validate.tankBar(tankBar);
    validate.feeling(feeling);
    validate.diveCenter(diveCenter);
    validate.notes(notes);

    // Make the API request to update the logbook synchronously
    return fetch(`http://${import.meta.env.VITE_API_URL}/logs/${logbookId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(data => {
                        const { error, message } = data;
                        throw new errors[error](message);
                    });
            }
        })
};