import Image from "next/image";
import ProductHeader from "./ProductHeader";

export default function CarouselComponent({imagenes}){
console.log(imagenes)
    return(
      <div className="carousel w-full rounded-md">
        {imagenes.map ((imagen, index)=> (<div id={index} key={imagen} className="carousel-item relative w-full">
        <Image
          src={`/img/${imagen}`} layout="responsive"
          width={160}
          height={160}
          className="w-full h-auto " alt="fotos producto"/>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href={"#" + index-1} className="btn btn-circle">❮</a>
          <a href={"#"+ index+1} className="btn btn-circle">❯</a>
        </div>
      </div>)
      )}
    </div>
    )
}