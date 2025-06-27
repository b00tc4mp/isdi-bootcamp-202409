
const rootElement = document.getElementById("root")
const root = ReactDOM.createRoot(rootElement)



const title = React.createElement("h1", { style: { backgroundColor: "green", textAlign: "center", width: "400px" } }, "Trap House sh**t")
const button = React.createElement("button", { type: "button", onClick: () => alert("Yamate kudasai!!") }, "click me oni-chan")
const imagen = React.createElement("img", { src: "https://weirdmarketingtales.com//wp-content/uploads/2022/06/caveman-spongebob-spongegar.png", alt: "sponge" })

const colors = [
    "blue",
    "red",
    "green",
    "magenta",
    "pink",
    "orange",
    "blue",
    "red",
    "green",
    "white",
]
let intervalo = null;
//let fondo = document.body.style.backgroundColor

/*const intervalo = setInterval(() => {
    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex += 1
    if (currentIndex >= colors.length) {
        clearInterval(intervalo)
    }
}, 1000)*/

const audio = new Audio("https://redirector.googlevideo.com/videoplayback?expire=1729113864&ei=qNoPZ9KuJ9SQsfIP4Y-EsAk&ip=209.141.37.75&id=o-ANydpcUkiEaQYT2II73peHsk8woJ1FgOUDx9Ky5F9m8z&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1729092264%2C&mh=Zn&mm=31%2C29&mn=sn-a5msenle%2Csn-a5meknde&ms=au%2Crdu&mv=m&mvi=2&pl=24&rms=au%2Cau&initcwndbps=533750&siu=1&bui=AXLXGFSF7iYrdmT0G8VfC727LhqZe4zswP1mbGOchx369Iwr4Wk49j21MByhkVKWfhiYaKjVlw&spc=54MbxdApyH-PDN7PnLUuTUyPObVbVKNcxHQqZl7xjxWQjUdW1XJAMjF-ypH67K_ftpvGjgHIag&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=SwEJFSs6h88j0RdRsdyPZ8EQ&rqh=1&gir=yes&clen=152489&dur=9.380&lmt=1699844541948415&mt=1729091847&fvip=4&keepalive=yes&fexp=51300761%2C51312688&c=WEB&sefc=1&txp=5318224&n=p0Hza3g754yHrw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgD-RePeObiOYRpByN_gei0T1aviPhtw86idmqlIdoslwCIQCc3zoIAa6jlOZZmW0dxjM_2WIUUPsQ4q84zePnIRDKDA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACJ0pHgwRQIhAMo0Cx_7sLs7-DsE9ImTsu7GyG9RjGDCEVm3QIcgYr63AiBeRW_YkX4I31kXCmLygQD6uGnJU04J7VT1Q8E6foFcRA%3D%3D&pot=Mlu4Q2FWK1uJ5Lh75sCF31Bfhw_wwHRK0TTW4ulBFwU-aK3uXtaFW5twN-EiLW2jgZreLkTvaMDcl4ZDUZdtok3Jt2Lh4qXEIkIASHBeav32xKsGUNXuQdTyjHIg&range=0-")

const change = React.createElement("span", {
    onClick: event => {
        event.preventDefault()
        if (intervalo) return;
        let currentIndex = 0
        audio.play()
        //const randomColor = colors[Math.floor(Math.random() * colors.length)];
        //document.body.style.backgroundColor = colors[currentIndex]
        //currentIndex = ( currentIndex + 1) % colors.length
        intervalo = setInterval(() => {
            document.body.style.backgroundColor = colors[currentIndex];
            currentIndex += 1
            if (currentIndex >= colors.length) {
                clearInterval(intervalo);
                intervalo = null;
                audio.pause();
                audio.currentTime = 0;
            }
        }, 1000)
    }
}, "🎄")



/*const division = React.createElement("div", {
    function changecolor() => {
    if ()

    }
},)*/




root.render([
    title,
    button,
    imagen,
    change,
])