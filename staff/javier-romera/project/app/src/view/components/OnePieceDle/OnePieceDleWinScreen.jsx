export default function OnePieceDleWinScreen({ correctChar }) {
    return <div className="h-full w-full fixed mt-[10rem] flex justify-center">
        <div className="w-[25rem] h-[30rem] bg-[rgba(234,222,194)] border-[2px] border-[black] rounded-[1rem] mt-[1rem] animate-fadeIn">
            <h1 className="text-[2rem] mt-[2rem]">Victory!</h1>
            <p className="mt-[4rem] ">You guessed</p>
            <p className="text-[2.5rem]">{correctChar}</p>
        </div>
    </div>
}