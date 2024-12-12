
import Image from "next/image";
import Link from "next/link";

const baseurl = "http://localhost:8080/public/"

export default function ProductComponent({ producto }) {
  return (
    <section>
      <Link href={`/product/${producto._id}`} passHref>
        {/* Usar `passHref` asegura que los hijos del `Link` reciban el href si es necesario */}
        <div className="card bg-base-100 w-responsive shadow-xl cursor-pointer">
          {/* Añade `cursor-pointer` para indicar que es clicable */}
          <figure>
            <Image
              src={`${baseurl}${producto?.images[0]}`}
              alt={producto.name}
              layout="responsive"
              width={160}
              height={160}
              className="w-full h-auto"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {producto.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{producto.price}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">chat</div>
              <div className="badge badge-outline">favoritos</div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
