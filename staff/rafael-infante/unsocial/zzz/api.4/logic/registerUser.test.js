import registerUser from "./registerUser.js";

try {
  registerUser('Camilo Sesto', 'cami@sesto.com', 'camiloses', '123123123', '123123123')
} catch (error) {
  console.error(error)
}