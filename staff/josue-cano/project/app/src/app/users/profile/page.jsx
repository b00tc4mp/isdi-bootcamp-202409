"use client";
import { useEffect, useState } from "react";
import ProductListComponent from "@/app/ui/product/ProductListComponent";
import { getProducts } from "@/app/logic/users/getProducts";
import useAuth from "@/app/utils/handlers/useAuth";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Manejo de errores
  const [refetch, setRefetch] = useState(false);

  useAuth();
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
  }, [refetch]);

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>; // Muestra un mensaje de error
  }

  return (
    <article className="">
      <h2 className="text-3xl font-bold text-center mt-5 text-gray-800">
        {products.length ? "Tus Productos " : "Aún no has subido productos"}
      </h2>
      <ProductListComponent products={products} refetch={refetch} setRefetch={setRefetch} admin={true} />
    </article>
  );
}
