import Image from "next/image";

export default function ProductHeader({ product }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span>
              {product?.author?.firstName.at(0)}
              {product?.author?.lastName.at(0)}
            </span>
          </div>
        </div>
        <h2 className="text-xl">{product?.name}</h2>
      </div>
    </div>
  );
}
