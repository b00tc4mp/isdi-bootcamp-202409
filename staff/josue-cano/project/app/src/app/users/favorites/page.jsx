"use client";
import { useEffect, useState } from "react";
import SearchComponent from "@/app/ui/SearchComponent";
import ProductListComponent from "@/app/ui/product/ProductListComponent";
import { getFavorites } from "@/app/logic/products/getFavorites";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores
  const [refetch, setRefetch] = useState(false);

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
  }, [refetch]);

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>; // Muestra un mensaje de error
  }

  return (
    <section>
      <ProductListComponent products={products} refetch={refetch} setRefetch={setRefetch}/>
    </section>
  );
}
