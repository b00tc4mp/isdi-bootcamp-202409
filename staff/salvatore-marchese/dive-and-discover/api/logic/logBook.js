//work in progress...


export default async function createLogBook({
    divingSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankType, tankBar, feeling, diveCenter, note }) {
        const logBook = new logBook({divingSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankType, tankBar, feeling, diveCenter, note})

        await logBook.save()

        return { message: 'Dive logged successfully!'}
    }