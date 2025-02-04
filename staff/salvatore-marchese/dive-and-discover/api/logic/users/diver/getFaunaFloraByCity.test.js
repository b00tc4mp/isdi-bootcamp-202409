import "dotenv/config";
import db from "dat";
import getFaunaFloraByCity from "./getFaunaFloraByCity.js";

await db.connect(process.env.MONGO_URL_TEST);

try {
    const result = await getFaunaFloraByCity( '67a0e9da8fc1671eb07fab97',"Barcelona");
    console.log("Found Fauna & Flora:", result);
} catch (error) {
    console.error("Unexpected Error (Valid City):", error);
}
finally {
    await db.disconnect();
    console.log("Disconnected from test database.");
}