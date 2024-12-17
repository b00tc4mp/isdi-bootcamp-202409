import {Footer, Header} from "./components"
import { Button } from "./library";
//import AddHabit from "./components/AddHabit"

import DayCircle from "./components/DayCircle"

export default function Home() {
    /*const handleAddHabit = () => {
        console.log('aqui se vera los habitos') */
    const days = [
        {name: "Lun", number: 1},
        {name: "Mar", number: 2},
        {name: "Mié", number: 3},
        {name: "Jue", number: 4},
        {name: "Vie", number: 5},
        {name: "Sáb", number: 6},
        {name: "Dom", number: 7}
    ];
    

    return (
        <div className="min-h-screen flex flex-col justify-betwwen">
            <Header title="Hábitos"></Header>
            <div className="flex-grow">
                <div className="flex justify-around mt-4 mb-8">
                    {days.map((day, index) => (
                        <DayCircle
                            key={index}
                            dayName={day.name}
                            dayNumber={day.number}
                            isActive={day.number === 1}
                        />
                    ))}
                
            <div className="flex flex-col justify-center mb-4">
                <Button> 💀 </Button>
            </div>
                

                </div>
            </div>
            <Footer />
        </div>
    )
}

