import { useState } from 'react'
//import logic from './logic'

function UploadPhoto() {
    const [image, setImages] = useState([])

    const handleImageChange = event => {
        const { files } = event.target

        const image = Array.prototype.map.call(files, file => URL.createObjectURL(file))

        setImages(images)
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        const formData = new FormData(event.target)
        try {
            const response = await fetch('http://localhost:8000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Error al subir la imagen.');
            const result = await response.json();
            alert('Imagen subida con éxito');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al subir la imagen.');
        }
    };

    return <>

        <h2>upload image</h2>

        <form onSubmit={handleFormSubmit}>
            <label htmlFor="text">text</label>
            <input type="text" name="text" id="text" />

            <label htmlFor="image">image</label>
            <input type="file" name="image" id="image" onChange={handleImageChange} multiple />
            <img src={image?.[0]} />

            <button type="submit">upload</button>
        </form>


        {images.map(image => <img key={image} src={image} />)}

    </>
}
export default UploadPhoto
