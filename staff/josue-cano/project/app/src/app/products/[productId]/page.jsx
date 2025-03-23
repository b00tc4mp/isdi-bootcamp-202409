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

  useEffect(() => {
    setIsAuth(getToken());
  }, []);

  return (
    <>
      <ProductDetail id={productId} addtoFavorites={addtoFavorites} />
    </>
  );
}
