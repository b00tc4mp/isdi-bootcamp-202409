import React, { useEffect, useState } from "react";
import { fetchCategorias } from "@/app/utils/productos/formulario";
import { createProduct } from "@/app/logic/products/createProduct.js";
import {redirect} from "next/navigation";

const NewProduct = () => {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubCategorias] = useState([]);
    const [subcategoriasActuales, setSubCategoriasActuales] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        idCategoria: "",
        idSubcategoria: "",
        price: "",
        description: "",
        images: Array(6).fill(null),
    });

    useEffect(() => {
        fetchCategorias(setCategorias, setSubCategorias);
    }, []);


    const handleCategoriaChange = (evt) => {
        setSubCategoriasActuales(subcategorias.filter(x => x.idCategoria == evt.target.value));
        setFormData({
            ...formData,
            ['idCategoria']: evt.target.value,
        });

    }


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
                newImages[index] = {image: reader.result, file}; // Guardar la URL base64
                setFormData({ ...formData, images: newImages });
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);

        createProduct(formData)
            .then(() => {
                redirect('/');
            })
            // .catch(error => console.error(error));


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

        {/* Categoría */}
        <div>
        <label htmlFor="categoria">Categoría</label>
        <select
        id="categoria"
        name="categoria"
        defaultValue={formData.idCategoria}
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
        name="idSubcategoria"
        defaultValue={formData.idSubcategoria}
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

        {/* price */}
        <div>
        <label htmlFor="price">Precio (€)</label>
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

        {/* Descripción */}
        <div>
        <label htmlFor="description">
        Descripción e información del producto
        </label>
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

        {/* images */}

        <div
        style={{
            display: "flex",
                gap: "10px",
                justifyContent: "space-between",
        }}
        >
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
            }}
            >
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
            onChange={ (evt) => handleImageChange(evt, index) }
            />
            </div>
        ))}
        </div>


        {/*<div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          {formData.images.map((_, index) => (
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
        */}
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
