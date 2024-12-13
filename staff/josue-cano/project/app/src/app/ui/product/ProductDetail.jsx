import { useState, useEffect } from "react";
import CarouselComponent from "./CarouselComponent";
import ProductHeader from "./ProductHeader";
import { getProductDetails } from "@/app/logic/products/getProductsDetail";

export default function ProductDetail({ id }) {
  const [product, setProduct] = useState(null);
  //en productos busca el productoid que sea igual al ide que le estamos pasando por props, tiene que ser doble igual porque viene con string para el triple=
  useEffect(() => {
    // Llama a la función para obtener el producto
    getProductDetails(id)
      .then((data) => {
        setProduct(data); // Actualiza los productos en el estado
      })
      .catch((err) => {
        setError(err); // Maneja los errores
      });
  }, []);
  return (
    <div className="card bg-base-100 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto m-5">
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
          <button className="btn btn-secondary">añadir al carrito</button>
          <button className="btn btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
