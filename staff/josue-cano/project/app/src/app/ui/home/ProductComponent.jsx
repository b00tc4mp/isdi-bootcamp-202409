"use client";
import Image from "next/image";
import Link from "next/link";

const baseurl = "http://localhost:8080/public/";

export default function ProductComponent({ producto, addtoFavorites, refetch, setRefetch }) {
  const favoritesHandler = async () => {
    const result = await addtoFavorites(producto._id);
    if (result.valid) {
      if (setRefetch) setRefetch(!refetch);
    } else {
      // alert(result.message);
    }
  };

  return (
    <section>
      {/* Usar `passHref` asegura que los hijos del `Link` reciban el href si es necesario */}
      <div className="card bg-base-100 w-responsive shadow-xl">
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
            <Link href={`/product/${producto._id}`} passHref>
              {producto.name}
            </Link>
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{producto.price}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">chat</div>
            <div
              onClick={favoritesHandler}
              className={producto.isFavorite == "true" ? "swap swap-active" : "swap swap-inactive"}>
              <div className="swap-off">
                <Image src="/icons/non-favorite.svg" width={24} height={24} layout="" />
              </div>
              <div className="swap-on">
                <Image src="/icons/favorite.svg" width={24} height={24} layout="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
