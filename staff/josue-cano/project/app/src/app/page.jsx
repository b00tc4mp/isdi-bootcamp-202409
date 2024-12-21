"use client";
import { useEffect, useState } from "react";
import SearchComponent from "./ui/SearchComponent";
import ProductListComponent from "./ui/product/ProductListComponent";
import { getProducts } from "@/app/logic/products/getProducts";
import EkoalitySection from "./ui/home/sobreNosotros";
import ExCompra from "./ui/home/exCompra";
import Contacto from "./ui/home/contacto";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores
  const [refetch, setRefetch] = useState(false);

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
  }, [refetch]); //se encarga de refrescar la lista de productos cuando alguno se elige como favorito

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>; // Muestra un mensaje de error
  }
  return (
    <section>
      <SearchComponent />
      <article className="mt-10">
        {/* Encabezado */}
        <header className="mb-8 text-center">
          <h2 className="text-black text-3xl font-bold">
            Descubre los mejores productos seleccionados especialmente para ti.
          </h2>
        </header>
        <ProductListComponent products={products} refetch={refetch} setRefetch={setRefetch} />
      </article>
      <EkoalitySection />
      <ExCompra />
      <Contacto />
    </section>
  );
}
