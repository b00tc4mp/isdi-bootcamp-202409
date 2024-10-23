const like = () => {

    const likeId = JSON.parse(localStorage.likeId)
    const id = JSON.parse(sessionStorage.loggedInUserId)


    likeId.push(id)


    localStorage.likeId = JSON.stringify(likeId)
}

export default like