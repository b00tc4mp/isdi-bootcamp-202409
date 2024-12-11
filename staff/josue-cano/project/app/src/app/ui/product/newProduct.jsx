import { fetchCategorias } from "@/app/utils/productos/formulario";
import React, { useEffect, useState } from "react";

const NewProduct = () => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubCategorias] = useState([]);
  const [subcategoriasActuales, setSubCategoriasActuales] = useState([]);
  useEffect(() => {
    fetchCategorias(setCategorias, setSubCategorias);
  }, []);


  const handleCategoriaChange = (evt) => {
    setSubCategoriasActuales(subcategorias.filter(x => x.idCategoria == evt.target.value));
  }

  const [formData, setFormData] = useState({
    nombreProducto: "",
    categoria: "",
    subcategoria: "",
    precio: "",
    descripcion: "",
    imagenes: Array(6).fill(null),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...formData.imagenes];
    updatedImages[index] = file;
    setFormData({ ...formData, imagenes: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  const inputStyle = {
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    width: "100%",
    marginTop: "5px",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Nuevo producto
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* Nombre del producto */}
        <div>
          <label htmlFor="nombreProducto">Nombre del producto</label>
          <input
            id="nombreProducto"
            type="text"
            name="nombreProducto"
            value={formData.nombreProducto}
            onChange={handleChange}
            placeholder="Nombre del producto"
            style={inputStyle}
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            defaultValue={formData.categoria}
            onChange={handleCategoriaChange}
            style={inputStyle}
          >
            <option value="">Seleccione</option>
            {categorias?.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nombre}
              </option>
            ))}

          </select>
        </div>

        {/* Subcategoría */}
        <div>
          <label htmlFor="subcategoria">Subcategoría</label>
          <select
            id="subcategoria"
            name="subcategoria"
            defaultValue={formData.subcategoria}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Seleccione</option>
            {subcategoriasActuales?.map((subcategoria) => (
              <option key={subcategoria._id} value={subcategoria._id}>
                {subcategoria.nombre}
              </option>
            ))}

          </select>
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="precio">Precio (€)</label>
          <input
            id="precio"
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio (€)"
            style={inputStyle}
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion">
            Descripción e información del producto
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción e información del producto"
            rows="4"
            style={inputStyle}
          />
        </div>

        {/* Imagenes */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          {formData.imagenes.map((_, index) => (
            <div
              key={index}
              style={{
                width: "60px",
                height: "60px",
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => alert(`Subir imagen para el cuadro ${index + 1}`)}
            >
              +
            </div>
          ))}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Subir producto
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
