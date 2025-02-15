import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProviderCard from './ProviderCard'
import { ClipLoader } from 'react-spinners';

import logic from '../logic'

import Provider from './Provider'

const isLoading = true

export default function ResultsProvidersList() {
    const [searchParams] = useSearchParams()
    const [providers, setProviders] = useState([])
    //const { alert } = useContext()

    const q = searchParams.get('q')
    const distance = Number(searchParams.get('distance'))

    useEffect(() => {
        loadProviders()
    }, [q, distance])

    const loadProviders = () => {
        if (q) {
          // Geolocalización del usuario
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = [position.coords.latitude, position.coords.longitude];
    
              // Buscar proveedores usando la lógica en el backend
              logic
                .searchProviders(q, distance, coords)
                .then((foundProviders) => {
                  setProviders(foundProviders); // Guardar los resultados en el estado
                })
                .catch((error) => {
                  console.error("Error al buscar proveedores:", error);
                  alert(error.message); // Mostrar error al usuario
                });
            },
            (error) => {
              console.error("Error al obtener geolocalización:", error);
              alert("No se pudo obtener tu ubicación."); // Mensaje en caso de fallo
            }
          );
        }
      };
    
      return (
        <section className="flex flex-col gap-6 mb-24">
        {isLoading ? (
            <ClipLoader color="#3498db" size={50} />
        ) : providers.length > 0 ? (
            providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
            ))
        ) : (
            <p>No se encontraron proveedores</p>
        )}
    </section>
);
    }