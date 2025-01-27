


import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

let gastosMes = [683.92, 749.30, 451.95, 340.50, 194.92, 2420.59]
let alimentos = ["Carne", "Pescado", "Verduras", "Seco", "Otros", "Total"]

let graphic = {
    labels: alimentos,
    datasets: [
        {
            label: 'mes actual',
            data: gastosMes,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(93, 173, 226)',  
            backgroundColor: 'rgba(93, 173, 226, 0.2)', 
            pointRadius: 5,
            pointBorderColor: 'rgb(27, 79, 114)',  
            pointBackgroundColor: 'rgb(33, 97, 140)' 
        },
    ],
}
let misoptions = {
    responsive: true,  // Ajuste para que el gráfico sea responsivo
    plugins: {
        title: {
            display: true,
            text: 'Gráfico de Gastos'
        },
        tooltip: {
            enabled: true
        }
    }
}
export default function GastosPageGraphic() {
    return <Line data={graphic} options={misoptions} />
}