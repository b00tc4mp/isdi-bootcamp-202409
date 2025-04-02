const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    console.log(xhr.status, xhr.response)
})

xhr.open('POST', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic m2vvqdtgcba')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send('{"image": "https://media.istockphoto.com/id/2154680719/es/foto/retrato-de-un-divertido-mapache-curioso-mirando-a-trav%C3%A9s-de-una-lupa-aislada-sobre-un-fondo.jpg?s=612x612&w=0&k=20&c=pYTBWtHYhkSqmpCGHLFczqONvdAjRdC_Sy0PjtPe_oQ=","text": "donde estas?"}')