import Image from "next/image";
import Link from "next/link";

export default function SearchComponent() {
  return (
    <div className="hero bg-base-100 min-h-screen">
      <div className="hero-content text-center w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-5">
            Encuentra y vende alimentos de calidad y proximidad
          </h1>
          <p className="py-6">
            <label className="input input-bordered flex items-center gap-2 rounded-full bg-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="text" className="grow" placeholder="Escribe el alimento que buscas para opciones cerca de ti" />
            </label>
          </p>
        </div>
      </div>
    </div>
  );
}
