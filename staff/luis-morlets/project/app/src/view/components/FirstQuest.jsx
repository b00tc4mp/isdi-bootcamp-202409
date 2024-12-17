import TextBox from './TextBox'

export default function FirstQuest() {
    console.log('firstQuest -> render')

    return <div className="relative w-full h-full flex justify-center items-center">
        <div className="flex w-full h-[65%] justify-evenly relative bottom-[7%]">
            <img src="images/King.png" alt="King of ealdoria" />
            <img src="images/Paladin.png" alt="Thalin lightbringer" />
        </div>

        <TextBox message={'A lunar cycle ago, an unprecedented darkness fell upon our kingdom. Fields withered, rivers became poisoned, and creatures that once lived in peace now lurk in every corner of our lands. This evil did not come out of nowhere.... It is said that in the Forgotten Temple to the east of our borders, lies a Core of Evil Energy, a fragment of pure chaos. For centuries, this power lay dormant... until a Lich a perverse creature seeking absolute immortality attempted to master it in order to transcend beyond death.'} />
    </div>
}