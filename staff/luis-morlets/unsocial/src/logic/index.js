import createPost from "./createPost";
import deletePost from "./deletePost";
import getPosts from "./getPosts";
import getUserName from "./getUserName";
import isUserLoggedIn from "./isUserLoggedIn";
import likesInteraction from "./likesInteraction";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserName,

    createPost,
    getPosts,
    deletePost,
    likesInteraction,
}

export default logic