"use client";
import { getProducts } from "@/app/logic/products/getProducts";
import ProductComponent from "./ProductComponent";
import { useEffect, useState } from "react";


export default function ProductListComponent() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    // Llama a la función para obtener los productos
    getProducts()
      .then((data) => {
        setProductos(data); // Actualiza los productos en el estado
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
      <header>
        <h2>¡Mira nuestros Productos destacados de vendedores PRO!</h2>
      </header>
      <section className="grid grid-cols-3 gap-4">
        {productos.map((producto) => (
          <ProductComponent producto={producto} key={producto._id} />
        ))}
      </section>
    </section>
  );
}
