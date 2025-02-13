import Image from "next/image";
import ProductHeader from "./ProductHeader";

const baseurl = "http://localhost:8080/public/";

export default function CarouselComponent({ images }) {
  return (
    <div className="carousel w-full rounded-md">
      {images?.map((image, index) => (
        <div id={index} key={image} className="carousel-item relative w-full">
          <Image
            src={`${baseurl}/${image}`}
            layout="responsive"
            width={160}
            height={160}
            className="w-full h-auto "
            alt="fotos producto"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href={"#" + parseInt(index - 1)} className="btn btn-circle">
              ❮
            </a>
            <a href={"#" + parseInt(index + 1)} className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
