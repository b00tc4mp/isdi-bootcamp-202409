import ProductComponent from "./ProductComponent";

export default function ProductListComponent() {
  let productos = new Array(20).fill(0);
  productos = productos.map((producto, index) => ({
    nombre: `producto ${index + 1}`,
    id: index,
    precio: Math.random() * 100 + 1,
    imagenes: ["sandias.png","hero.jpg"],
  }));
  console.log(productos);
  return (
    <section>
      <header>
        <h2>¡Mira nuestros Productos destacados de vendedores PRO!</h2>
      </header>
      <section className="grid grid-cols-3 gap-4">
        {productos.map((producto) => (
          <ProductComponent producto={producto} key={producto.id} />
        ))}
      </section>
    </section>
  );
}
