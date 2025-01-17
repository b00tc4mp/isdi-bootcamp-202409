import "dotenv/config";
import db from "dat";

import authenticateUser from "./authenticateUser";

await db.connect(process.env.MONGO_URL);

try {
  const user = await authenticateUser("goku", "123123123");
} catch (error) {
  console.error(error);
} finally {
  await db.disconnect();
}
