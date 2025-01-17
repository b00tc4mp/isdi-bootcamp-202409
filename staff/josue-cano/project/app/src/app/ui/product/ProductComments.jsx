import Image from "next/image";

export default function ProductComments({ comments }) {
  return comments ? (
    <div></div>
  ) : (
    <article className="card bg-base-100 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto m-5 shadow-xl">
      <section className="card-body">
        <header>
          <h2 className="text-2xl">Comentarios:</h2>
          <div className="divider"></div>
        </header>
        <section></section>
        <section>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Mensaje" />
            <button className="btn btn-sm btn-secondary">&#11168;</button>
          </label>
        </section>
      </section>
    </article>
  );
}
