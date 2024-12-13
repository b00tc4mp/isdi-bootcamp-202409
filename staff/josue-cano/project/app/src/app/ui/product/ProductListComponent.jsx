"use client";
import ProductComponent from "./ProductComponent";
import { addtoFavorites } from "@/app/logic/products/addtoFavorites.js";

export default function ProductListComponent({ products }) {
  return (
    <section className="flex flex-col items-center px-8 py-12 bg-gray-50">
      {/* Encabezado */}
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          ¡Mira nuestros Productos destacados de vendedores PRO!
        </h2>
        <p className="text-gray-600">
          Descubre los mejores productos seleccionados especialmente para ti.
        </p>
      </header>

      {/* productos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((producto) => (
          <ProductComponent
            producto={producto}
            key={producto._id}
            addtoFavorites={addtoFavorites}
          />
        ))}
      </section>
    </section>
  );
}
