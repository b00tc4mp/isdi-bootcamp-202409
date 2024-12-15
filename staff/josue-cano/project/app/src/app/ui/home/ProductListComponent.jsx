"use client";
import {setRequestMeta} from "next/dist/server/request-meta";
import ProductComponent from "./ProductComponent";
import { addtoFavorites } from '@/app/logic/products/addtoFavorites.js';


export default function ProductListComponent({products, refetch, setRefetch}) {

  return (
    <section>
      <header>
      {products.length ? <h2>Favoritos: </h2> : <h2>No hay productos favoritos</h2> }
      </header>
      <section className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((producto) => (
          <ProductComponent producto={producto} key={producto._id} addtoFavorites={addtoFavorites} refetch={refetch} setRefetch={setRefetch}/>
        ))}
      </section>
    </section>
  );
}
