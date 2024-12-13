'use client'
import {useEffect, useState} from 'react';
import SearchComponent from "@/app/ui/SearchComponent";
import ProductListComponent from "@/app/ui/home/ProductListComponent";
import { getFavorites } from "@/app/logic/products/getFavorites";

export default function Index() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    // Llama a la función para obtener los productos
    getFavorites()
      .then((data) => {
        setProducts(data); // Actualiza los productos en el estado
      })
      .catch((err) => {
        setError(err); // Maneja los errores
      });
  }, []);

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>; // Muestra un mensaje de error
  }



  return (
    <section>
      <ProductListComponent products={products}/>
    </section>
  );
}

