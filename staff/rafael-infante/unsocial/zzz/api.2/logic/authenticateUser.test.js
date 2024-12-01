import authenticateUser from "./authenticateUser.js";

try {
  console.log(authenticateUser('camiloses', '123123123'))
} catch (error) {
  console.error(error)
}