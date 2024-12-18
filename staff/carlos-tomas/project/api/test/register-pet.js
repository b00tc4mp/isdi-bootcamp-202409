fetch('http://192.168.232.128:8080/veterinary/registerPet', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRlZWJkYjgxZTJjNjE5YjkxZjdkZTUiLCJyb2xlIjoidmV0ZXJpbmFyeSIsImlhdCI6MTczNDM1NjUyMiwiZXhwIjoxNzM0Nzg4NTIyfQ.k9QtURzWf3m_-T0dHAAs4RShXhkSCUVE6pCcMo2c6L8',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        chip: "012345678913548",
        name: "Peketest",
        race: "Meztizo",
        sex: true,
        weight: 35,
        sterilized: true,
        dateOfBirth: "2012/12/11"
    })
})
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Error: ${response.status} - ${text}`);
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

