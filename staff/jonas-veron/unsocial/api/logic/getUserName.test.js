import "dotenv/config";
import db from "dat";
import getUserName from "./getUserName.js";

await db.connect(process.env.MONGO_URL_TEST);

try {
  const name = await getUserName(
    "67449ce6549f85dc24245887",
    "67449ce6549f85dc24245887"
  );
  console.log(name);
} catch (error) {
  console.error(error);
} finally {
  await db.disconnect();
}
