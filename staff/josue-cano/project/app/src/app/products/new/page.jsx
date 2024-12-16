"use client";
import NewProduct from "@/app/ui/product/newProduct";
import useAuth from "@/app/utils/handlers/useAuth";

const Home = () => {
  //usamos useAuth() y determina su la sesion es invalida
  useAuth();
  return <NewProduct />;
};

export default Home;
