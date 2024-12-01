export default function Tips() {
    return <>
        <h2>Tips</h2>

        <div className="bg-[var(--yellow-color)] p-4 rounded-lg mt-4 mb-4">
            <h3>WEEK OF YOUR CYCLE</h3>
            <h2>Luteal phase</h2>
            <p>Prioritize self-care.</p>
        </div >

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>NUTRITION</h3>
                <p>Stay hydrated. Drinking water or herbal teas can reduce bloating and help you feel refreshed.</p>
            </div >

            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>EXERCISE</h3>
                <p>Use a foam roller for tight muscles. It boosts blood flow and relieves pain in sore areas.</p>
            </div >

            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>SELF-CARE</h3>
                <p>Spend time in nature. A short walk or sitting outside clears your mind and uplifts your mood.</p>
            </div >

            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>MUSIC</h3>
                <p>Tip</p>
            </div >
        </div>
    </>
}