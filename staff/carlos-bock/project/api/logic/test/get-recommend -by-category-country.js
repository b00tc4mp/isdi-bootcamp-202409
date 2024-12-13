const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
});

xhr.open('GET', 'http://localhost:8080/recommends/categories/1/countries/España')
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU0YTgxNDljMTc1NjQ0YTYwZGFkODIiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzYwMTMxOCwiZXhwIjoxNzM2MTkzMzE4fQ.AUxnOlJHV4OeiT_0M5uWLALRRNYOCVrtzWt3LwXn41Y')

xhr.send()


async function fetchRecommendations() {
    const url = 'http://localhost:8080/recommends/categories/1/countries/España'
    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU0YTgxNDljMTc1NjQ0YTYwZGFkODIiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTczMzYwMTMxOCwiZXhwIjoxNzM2MTkzMzE4fQ.AUxnOlJHV4OeiT_0M5uWLALRRNYOCVrtzWt3LwXn41Y'
    }

    try {
        const response = await fetch(url, { method: 'GET', headers })

        if (response.ok) {
            const data = await response.json()
        } else {
            const error = await response.json()
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

fetchRecommendations()