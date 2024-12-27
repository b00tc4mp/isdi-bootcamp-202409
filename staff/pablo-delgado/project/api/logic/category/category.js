import 'dotenv/config'
import fs from 'fs/promises'

import db from './index'
import { Category } from './models'

async function populateCategories() {
    try {
        // Leemos el archivo CSV de categorías
        const csv = await fs.readFile('./categories.csv', 'utf-8');
        const lines = csv.split('\n');

        // Procesamos cada línea del CSV
        const creations = lines.map(line => {
            const [name, description] = line.split(',').map(item => item.trim());

            // Creamos la categoría con los datos del CSV
            return Category.create({ name, description });
        });

        // Esperamos que todas las categorías se hayan creado
        await Promise.all(creations);
        console.log('Categorías creadas exitosamente');
    } catch (error) {
        console.error('Error al poblar las categorías:', error);
    } finally {
        db.disconnect();
    }
}

populateCategories();