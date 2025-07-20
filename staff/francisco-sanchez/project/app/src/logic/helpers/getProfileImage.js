export default (userDetails) => {
    // Calcula la URL de la imagen del perfil
    const profileImage = userDetails?.profileImage
        ? `${import.meta.env.VITE_API_URL}${userDetails.profileImage}`
        : `${import.meta.env.VITE_API_URL}/images/profile/profile1.jpeg` //default image

    return profileImage
}