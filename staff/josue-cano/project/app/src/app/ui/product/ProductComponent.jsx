import { deleteProduct } from "@/app/logic/products/deleteProduct";
import { getToken } from "@/app/utils/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const baseurl = "http://localhost:8080/public/";

export default function ProductComponent({ product, addtoFavorites, refetch, setRefetch, admin }) {
  const favoritesHandler = async () => {
    const result = await addtoFavorites(product._id);
    if (result.valid) {
      if (setRefetch) setRefetch(!refetch);
    } else {
      // alert(result.message);
    }
  };
  const chatHandler = async () => {
    const token = getToken();

    if (token) {
      redirect(`/users/chats/new/${product.author}`);
    } else {
      alert("Debes iniciar sesión para poder chatear");
    }
  };
  const deleteHandler = async () => {
    const result = await deleteProduct(product._id);
    if (result.valid) {
      if (setRefetch) setRefetch(!refetch);
    } else {
      // alert(result.message);
    }
  };

  return (
    <section className="product-grid">
      <div className="card">
        <figure className="image-container">
          <Image
            src={`${baseurl}${product?.images[0]}`}
            alt={product?.name || "Product image"}
            layout="fill"
            className="image-uniform"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <Link href={`/products/${product?._id}`} passHref>
              {product?.name}
            </Link>
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{product?.price}</p>
          <div className="card-actions justify-end">
            {admin ? (
              <button className="btn btn-sm btn-secondary" onClick={deleteHandler}>
                Eliminar
              </button>
            ) : (
              <>
                <button onClick={chatHandler} className="badge badge-outline">
                  Chat
                </button>
                <div
                  onClick={favoritesHandler}
                  className={product?.isFavorite == true ? "swap swap-active" : "swap swap-inactive"}>
                  <div className="swap-off">
                    <Image src="/icons/non-favorite.svg" width={24} height={24} alt="favorite yes" />
                  </div>
                  <div className="swap-on">
                    <Image src="/icons/favorite.svg" width={24} height={24} alt="favorite no" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Tarjetas responsivas */
          gap: 1rem; /* Espacio entre tarjetas */
          padding: 2rem;
        }
        .card {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          height: 400px; /* Altura uniforme */
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 60%; /* 60% del alto total de la tarjeta */
        }
        .image-uniform {
          object-fit: cover; /* Mantén proporción sin deformar */
        }
        .card-body {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-title {
          font-size: 1.2rem;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}
