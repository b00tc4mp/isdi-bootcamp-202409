export default timestamp => {
    if (!timestamp) return ''

    const messageDate = new Date(timestamp)

    return messageDate.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
    })
}