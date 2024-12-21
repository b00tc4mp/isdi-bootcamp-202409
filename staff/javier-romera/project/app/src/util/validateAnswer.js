export default (character, answers, currentIndex) => {
    return answers[currentIndex].some(char => char.name === character)
}