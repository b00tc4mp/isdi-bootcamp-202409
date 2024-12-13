"use client";
import ProductComponent from "./ProductComponent";
import { addtoFavorites } from '@/app/logic/products/addtoFavorites.js';


export default function ProductListComponent({products}) {

  return (
    <section>
      <header>
        <h2>¡Mira nuestros Productos destacados de vendedores PRO!</h2>
      </header>
      <section className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((producto) => (
          <ProductComponent producto={producto} key={producto._id} addtoFavorites={addtoFavorites}/>
        ))}
      </section>
    </section>
  );
}
