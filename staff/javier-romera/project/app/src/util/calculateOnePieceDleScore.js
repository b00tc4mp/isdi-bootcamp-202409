export default (tries) => {
    if (tries > 10) return

    return 220 - (tries * 20)
}