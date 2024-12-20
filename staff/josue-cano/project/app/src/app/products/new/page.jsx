"use client";
import NewProduct from "@/app/ui/product/newProduct";
import useAuth from "@/app/utils/handlers/useAuth";

const Home = () => {
  useAuth();
  return <NewProduct />;
};

export default Home;
