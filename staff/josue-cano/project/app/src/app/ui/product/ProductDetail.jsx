import { useState, useEffect } from "react";
import Image from "next/image";
import CarouselComponent from "./CarouselComponent";
import ProductHeader from "./ProductHeader";
import { getProductDetails } from "@/app/logic/products/getProductsDetail";
import { getToken } from "@/app/utils/session";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  useEffect(() => {
    console.log("SOY PRODUCT:", product);
  }, [product]);

  const chatHandler = async () => {
    const token = getToken();

    if (token) {
      redirect(`/users/chats/new/${product.author._id}`);
    } else {
      alert("Debes iniciar sesión para poder chatear");
    }
  };

  return (
    <>
      <div className="card bg-base-100 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-5 shadow-xl">
        {product ? (
          <div className="card-body">
            {/* nombre es la variable y producto el valor que insertaremos en la variable */}
            <ProductHeader product={product} />
            <section className="">
              <CarouselComponent images={product?.images} />
            </section>
            {/* Mostrar el precio del producto */}
            {/* <p>Producto: {product?.name}</p> */}
            <p>Precio: {product?.price?.toFixed(2)}€</p>
            <p className="text-lg font-semibold mt-4">Descripción del Producto</p>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <p className="text-gray-700 text-sm leading-6">{product?.description}</p>
            </div>
            <div className="card-actions justify-end">
              <button onClick={chatHandler} className="badge badge-outline">
                Chat
              </button>
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
      {console.log(product?.author?.location?.src)}
      {product?.author?.location?.src ? (
        <div className="card w-3/4 mx-auto mt-5 shadow-xl">
          <div className="card-body">
            <iframe src={product?.author?.location?.src} frameBorder="0" className="h-96"></iframe>
          </div>
        </div>
      ) : (
        <p className=" text-center p-7">La ubicación del autor no está disponible.</p>
      )}
    </>
  );
}
