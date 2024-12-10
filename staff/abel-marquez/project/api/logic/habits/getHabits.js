import { Habit } from 'dat';

export default async function getHabits({ userId }) {
    if (!userId) {
        throw new Error('Missing required field: userId');
    }

    // Buscar hábitos relacionados al usuario en la base de datos
    const habits = await Habit.find({ user: userId }).lean();

    return habits;
}
