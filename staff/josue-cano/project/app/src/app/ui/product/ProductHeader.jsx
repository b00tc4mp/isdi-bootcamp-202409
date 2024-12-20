import Image from "next/image";

export default function ProductHeader({ name }) {
  return (
    <div className="flex flex-row  justify-between">
      <div className="flex flex-row">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span>SY</span>
          </div>
        </div>

        <div>
          <p>{name}</p>
          <div className="rating">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          </div>
        </div>
      </div>
      {/*<div className="flex flex-row items-end">
            <button className="btn btn-sm btn-square">
            <Image
                  src="/icons/favoritos.svg"
                  alt="icono pro"
                  width={20}
                  height={20}
                ></Image>{" "}
            </button>
            <button className="btn btn-sm btn-square">
            <Image
                  src="/icons/mensajes.svg"
                  alt="icono pro"
                  width={20}
                  height={20}
                ></Image>{" "}
            </button>
        </div>*/}
    </div>
  );
}
