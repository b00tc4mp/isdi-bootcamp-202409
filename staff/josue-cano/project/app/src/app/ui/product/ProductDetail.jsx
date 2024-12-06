import CarouselComponent from "./CarouselComponent";
import ProductHeader from "./ProductHeader";

export default function ProductDetail({ id }) {
  let productos = new Array(20).fill(0);
  productos = productos.map((producto, index) => ({
    nombre: `producto ${index + 1}`,
    id: index,
    precio: Math.random() * 100 + 1,
    imagenes: ["sandias.png", "hero.jpg"],
  }));
  //en productos busca el productoid que sea igual al ide que le estamos pasando por props, tiene que ser doble igual porque viene con string para el triple=
  const product = productos.find((p) => p.id == id);
  return (
    <div className="card bg-base-100 w-1/2  mx-auto m-5">
      <div className="card-body">
        {/* nombre es la variable y producto el valor que insertaremos en la variable */}
        <ProductHeader nombre={product.nombre} />
        <section>
          <CarouselComponent imagenes={product.imagenes} />
        </section>
        {/* Mostrar el precio del producto */}
        <p>Producto: {product.nombre}</p>
        <p>Precio: {product.precio.toFixed(2)}€</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">añadir al carrito</button>
          <button className="btn btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
