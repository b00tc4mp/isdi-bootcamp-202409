import "dotenv/config";
import db from "dat";
import registerUser from "./registerUser";

await db.connect(process.env.MONGO_URL);


  const userData = {
    firstName: "josue",
    lastName: "cano",
    email: "josue.cano@example.com",
    ubicacion: "675c34a750659ce09993db93", // ID válido
    password: "123123123",
    passwordRepeat: "123123123",
  };

  const result = await registerUser(userData);
  console.log("User registered successfully:", result);
} catch (error) {
  console.error("Error during user registration:", error.message);
} finally {
  await db.disconnect();
}
