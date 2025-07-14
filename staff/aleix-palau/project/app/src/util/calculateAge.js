export default dob => {
    // Handle empty or invalid inputs
    if (!dob) return NaN

    const birthDate = new Date(dob)

    // Check if date is valid
    if (isNaN(birthDate.getTime())) return NaN

    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
}