import { useState, useEffect } from "react";
import Image from "next/image";
import CarouselComponent from "./CarouselComponent";
import ProductHeader from "./ProductHeader";
import { getProductDetails } from "@/app/logic/products/getProductsDetail";
import Link from "next/link";

export default function ProductDetail({ id, addtoFavorites }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  const favoritesHandler = async () => {
    const result = await addtoFavorites(id);
    if (result.valid) {
      if (setRefetch) setRefetch(!refetch);
    } else {
      // alert(result.message);
    }
  };

  useEffect(() => {
    // Llama a la función para obtener el producto
    getProductDetails(id)
      .then((data) => {
        setProduct(data); // Actualiza los productos en el estado
      })
      .catch((err) => {
        setError(err); // Maneja los errores
      });
  }, [id, refetch]);
  return (
    <div className="card bg-base-100 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-5 shadow-xl">
      {product ? (
        <div className="card-body">
          {/* nombre es la variable y producto el valor que insertaremos en la variable */}
          <ProductHeader name={product?.name} />
          <section className="">
            <CarouselComponent images={product?.images} />
          </section>
          {/* Mostrar el precio del producto */}
          <p>Producto: {product?.name}</p>
          <p>Precio: {product?.price?.toFixed(2)}€</p>
          <div className="card-actions justify-end">
            <Link href={`/users/chats/new/${product.author}`} className="badge badge-outline">
              Chat
            </Link>
            <div
              onClick={favoritesHandler}
              className={product.isFavorite == true ? "swap swap-active" : "swap swap-inactive"}>
              <div className="swap-off">
                <Image src="/icons/non-favorite.svg" width={24} height={24} alt="favorite yes" layout="" />
              </div>
              <div className="swap-on">
                <Image src="/icons/favorite.svg" width={24} height={24} alt="favorite no" layout="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">Producto no encontrado</div>
      )}
    </div>
  );
}
