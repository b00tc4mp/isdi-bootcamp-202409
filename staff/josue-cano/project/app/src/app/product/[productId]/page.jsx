"use client"
import { useParams } from "next/navigation";
import ProductDetail from "../../ui/product/ProductDetail";

export default function page({ params }) {
  // const router = useRouter()
  const { productId } = useParams();
  return <ProductDetail id={productId} />;
}
