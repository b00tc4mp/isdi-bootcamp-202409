// import Image from "next/image";
// import Link from "next/link";

// export default function ProductComponent({producto}) {
//     // console.log(producto)
//   return (
//     <section>
//       <div className="card bg-base-100 w-responsive shadow-xl">
//         <figure>
//           <Image
//             src={`/img/${producto?.imagenes[1]}`}
//             alt="Shoes"
//             layout="responsive"
//             width={160}
//             height={160}
//             className="w-full h-auto"
//           />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">
//             {producto.nombre}
//             <div className="badge badge-secondary">NEW</div>
//           </h2>
//           <p>{producto.precio}</p>
//           <div className="card-actions justify-end">
//             <div className="badge badge-outline">Fashion</div>
//             <div className="badge badge-outline">Products</div>
//             <Link href={`/product/${producto.id}`}>ver </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import Image from "next/image";
import Link from "next/link";

export default function ProductComponent({ producto }) {
  return (
    <section>
      <Link href={`/product/${producto.id}`} passHref>
        {/* Usar `passHref` asegura que los hijos del `Link` reciban el href si es necesario */}
        <div className="card bg-base-100 w-responsive shadow-xl cursor-pointer">
          {/* Añade `cursor-pointer` para indicar que es clicable */}
          <figure>
            <Image
              src={`/img/${producto?.imagenes[1]}`}
              alt={producto.nombre}
              layout="responsive"
              width={160}
              height={160}
              className="w-full h-auto"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {producto.nombre}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{producto.precio}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
