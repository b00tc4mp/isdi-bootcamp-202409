/*const toBase64 = (file) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })

}*/

const toBase64 = (file) => {

    const imageData = new Uint8Array(file);
    
    // btoa: The btoa() method of the Window interface creates a Base64-encoded ASCII string from a binary string 
    const base64Image = btoa(String.fromCharCode(...imageData));
    return base64Image;
}

export {
    toBase64
}


    