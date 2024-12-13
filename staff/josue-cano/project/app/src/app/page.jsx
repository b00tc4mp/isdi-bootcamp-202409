"use client";
import { useEffect, useState } from "react";
import SearchComponent from "./ui/SearchComponent";
import ProductListComponent from "./ui/product/ProductListComponent";
import { getProducts } from "@/app/logic/products/getProducts";
import EkoalitySection from "./ui/home/sobreNosotros";
import ExCompra from "./ui/home/exCompra";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    // Llama a la función para obtener los productos
    getProducts()
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
      <SearchComponent />
      <ProductListComponent products={products} />
      <EkoalitySection />
      <ExCompra />
    </section>
  );
}
