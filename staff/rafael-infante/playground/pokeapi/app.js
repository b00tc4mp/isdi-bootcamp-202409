const btnApi = document.getElementById('btn-api')
const apiData = document.getElementById('api-data')

const callApi = () => {
  fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((res) => res.json())
    .then((data) => {
      apiData.innerText = JSON.stringify(data.base_experience)
    })
    .catch((error) => console.error(new Error(error)))
}

btnApi.addEventListener('click', callApi)
