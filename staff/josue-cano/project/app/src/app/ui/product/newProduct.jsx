"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { getCategories } from "@/app/utils/productos/formulario";
import { createProduct } from "@/app/logic/products/createProduct.js";
import Alert from "../Alert"; 

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);

  // Estados para el Alert
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertLevel, setAlertLevel] = useState("success");

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    description: "",
    images: Array(6).fill(null),
  });

  useEffect(() => {
    getCategories(setCategories, setSubcategories);
  }, []);

  const handleCategoriaChange = (evt) => {
    setCurrentSubcategories(subcategories.filter((x) => x.category === evt.target.value));
    setFormData({
      ...formData,
      category: evt.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...formData.images];
        newImages[index] = { image: reader.result, file };
        setFormData({ ...formData, images: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(formData)
      .then(() => {
        setAlertMessage("Producto creado correctamente.");
        setAlertLevel("success");
      })
      .catch((error) => {
        setAlertMessage(error.message);
        setAlertLevel("error");
      });
  };

  // Cuando el usuario cierra el Alert
  const handleAlertAccept = () => {
    setAlertMessage(null);
    // Si fue éxito, redirigimos después de cerrar el Alert
    if (alertLevel === "success") {
      router.push("/");
    }
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
      {alertMessage && <Alert message={alertMessage} level={alertLevel} onAccepted={handleAlertAccept} />}

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Nuevo producto</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label htmlFor="name">Nombre del producto</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleCategoriaChange}
            style={inputStyle}>
            <option value="">Seleccione</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategory">Subcategoría</label>
          <select
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            style={inputStyle}>
            <option value="">Seleccione</option>
            {currentSubcategories.map((subcat) => (
              <option key={subcat._id} value={subcat._id}>
                {subcat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Precio (€/kg)</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="price (€)"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="description">Descripción e información del producto</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción e información del producto"
            rows="4"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
          {formData.images.map((imagen, index) => (
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
                position: "relative",
                overflow: "hidden",
                background: imagen ? `url(${imagen.image}) center/cover` : "#f0f0f0",
              }}>
              {!imagen && "+"}
              <input
                type="file"
                accept="image/*"
                name="images[]"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
                onChange={(evt) => handleImageChange(evt, index)}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}>
          Subir producto
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
