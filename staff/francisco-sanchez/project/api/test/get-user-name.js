const xhr = new XMLHttpRequest();

// Callback para manejar la respuesta de la solicitud
xhr.addEventListener('load', () => {
    console.log(`Status: ${xhr.status}`);
    console.log(`Response: ${xhr.response}`);
});

// Configura la solicitud
xhr.open('GET', 'http://localhost:8080/users/675036c010473f3d809e5359/name');

// Define el token JWT
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwMzZjMDEwNDczZjNkODA5ZTUzNTkiLCJyb2xlIjoic3RhbmRhcmQiLCJpYXQiOjE3MzM4Mjg0MTYsImV4cCI6MTczMzg1NzIxNn0.VancAL12ZxtfLX1i96PqkszViUjsA534bkUN8H1oR4c'; // Sustituye por tu token válido

// Añade el encabezado Authorization con Bearer Token
xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);

// Envía la solicitud
xhr.send();
