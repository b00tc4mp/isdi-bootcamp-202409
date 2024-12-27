export default (time, hp) => {
    const splitedTime = time.toString().split('.')[0]
    const multiplier1 = splitedTime > 120 ? 1 : splitedTime > 60 ? 2 : 3

    return 50 * multiplier1 * hp
}