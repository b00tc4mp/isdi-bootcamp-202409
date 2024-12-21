export default (height) => {
    if (height < 100) {
        return `${height}cm`;
    } else {
        return `${(height / 100).toFixed(2)}m`;
    }
}