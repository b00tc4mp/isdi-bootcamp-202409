const xhr = new XMLHttpRequest();
const data = JSON.stringify({
    city: "Madrid",
    country: "España",
    category: 3,
    price: 1,
    link: "https://example.com",
    imageUrl: "https://example.com/image.jpg",
    recommend: "Una guía rápida para supermercados en Madrid.",
    subject: "supermercados"
})

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/recommend')
xhr.setRequestHeader('Authorization', `Bearer ${localStorage.token}`)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(data)




async function createRecommend() {
    const url = 'http://localhost:8080/recommend';
    const data = {
        city: "Barcelona",
        country: "España",
        category: 3,
        price: 1,
        link: "https://example2.com",
        imageUrl: "https://example2.com/image.jpg",
        recommend: "Una guía rápida para supermercados en Madrid.",
        subject: "supermercados"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}` // Add token from localStorage
            },
            body: JSON.stringify(data)
        });

        console.log('Response Status:', response.status);

        if (response.ok) {
            const result = await response.json();
            console.log('Response Data:', result);
        } else {
            const error = await response.json();
            console.error('Error Response:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

createRecommend();


