import { Habit } from '../../../dat/models.js'

export default async function addHabit({ userId, name, category, emoji }) {
    // Validaciones básicas (HACERLAS CON EL VALIDATEE)
    if (!userId || !name || !category || !emoji) {
        throw new Error('Missing required fields: userId, name, category, emoji');
    }

    // Crear un nuevo hábito
    const habit = new Habit({
        user: userId,
        name,
        category,
        emoji,
        createdAt: new Date(),
    });

    // Guardar el hábito en la base de datos
    await habit.save();
}
