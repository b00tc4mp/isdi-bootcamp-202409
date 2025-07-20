fetch('http://192.168.232.128:8080/pets/history/internal_medicine/675c5f03a421b6fbc2639f93', {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRlZWJkYjgxZTJjNjE5YjkxZjdkZTUiLCJyb2xlIjoidmV0ZXJpbmFyeSIsImlhdCI6MTczNDM1NjUyMiwiZXhwIjoxNzM0Nzg4NTIyfQ.k9QtURzWf3m_-T0dHAAs4RShXhkSCUVE6pCcMo2c6L8'
    }
})
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Error: ${response.status}${text}`);
            })
        }
        return response.json()
    })
    .then(data => {
        console.log('Respuesta de la API:', data)
    })
    .catch((error) => {
        console.error('Error:', error.message)
    })
