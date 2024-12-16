"use client";
import { useParams } from "next/navigation";
import ProductDetail from "@/app/ui/product/ProductDetail";
import { addtoFavorites } from "@/app/logic/products/addtoFavorites";

export default function page() {
  // const router = useRouter()
  const { productId } = useParams();
  return <ProductDetail id={productId} addtoFavorites={addtoFavorites} />;
}
