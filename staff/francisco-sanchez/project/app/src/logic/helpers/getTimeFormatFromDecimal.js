import { errors } from "com";

const { SystemError, ValidationError } = errors;

export default async (timeAdjust) => {

    try {
        // Validar que timeAdjust es un string
        if (typeof timeAdjust !== 'string') {
            throw new ValidationError('Time adjustment must be a string in the format (+/-)hh:mm:ss.')
        }

        const match = /^([-+]?)(\d{2}):(\d{2}):(\d{2})$/.exec(timeAdjust);
        if (!match) {
            throw new ValidationError('Invalid time format. Use (+/-)hh:mm:ss.')
        }

        const sign = match[1] === '-' ? -1 : 1;
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);
        const seconds = parseInt(match[4], 10);

        const decimal = hours + minutes / 60 + seconds / 3600;
        return decimal * sign;

    } catch (error) {
        throw new SystemError(error.message)
    }
}