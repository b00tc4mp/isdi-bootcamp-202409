"use client";
import ProductComponent from "./ProductComponent";
import { addtoFavorites } from "@/app/logic/products/addtoFavorites.js";

export default function ProductListComponent({
  products = [],
  refetch,
  setRefetch,
  admin,
}) {
  return (
    <section
      id="listComponent"
      className="flex flex-col items-center px-8 py-20 bg-gray-50"
    >
      {/* productos */}
      {products.length ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductComponent
              product={product}
              key={product._id}
              addtoFavorites={addtoFavorites}
              refetch={refetch}
              setRefetch={setRefetch}
              admin={admin}
            />
          ))}
        </section>
      ) : (
        <h2 className="text-3xl font-bold text-center mt-5 text-gray-800">
          No hay productos para mostrar
        </h2>
      )}
    </section>
  );
}
