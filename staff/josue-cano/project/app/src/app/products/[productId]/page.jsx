"use client";
import { useParams } from "next/navigation";
import ProductDetail from "@/app/ui/product/ProductDetail";
import { addtoFavorites } from "@/app/logic/products/addtoFavorites";
// import ProductComments from "@/app/ui/product/ProductComments";
// import {getComments} from "@/app/logic/users/getComments";
import { getToken } from "@/app/utils/session";
import { useEffect, useState } from "react";

export default function Page() {
  const { productId } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  // const router = useRouter()
  //
  //
  //
  // se usa el productId, usuario actual y autor
  useEffect(() => {
    setIsAuth(getToken());
  }, []);
  // if(isAuth)
  //     if(productId)
  //         getComments(productId);

  return (
    <>
      <ProductDetail id={productId} addtoFavorites={addtoFavorites} />{/* isAuth && <ProductComments /> */}
      
    </>
  );
}
