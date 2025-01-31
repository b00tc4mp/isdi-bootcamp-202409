import "dotenv/config";
import db, { FaunaFlora } from "dat";
import getFaunaFloraByCity from "./getFaunaFloraByCity.js";
import { errors } from "com";

const { NotFoundError, ValidationError } = errors;

await db.connect(process.env.MONGO_URL_TEST);

try {
    console.log("Running getFaunaFloraByCity tests...");

    // Ensure test data exists
    let faunaFlora = await FaunaFlora.findOne({ city: "barcelona" });

    if (!faunaFlora) {
        console.log("Inserting test data for Barcelona...");
        await FaunaFlora.create({
            city: "barcelona",
            fauna: ["Mediterranean Monk Seal", "Loggerhead Sea Turtle", "Common Octopus"],
            flora: ["Posidonia Oceanica", "Coralline Algae", "Seaweed"],
            description: "Barcelona’s coastal waters and nearby marine ecosystems offer a fascinating glimpse into Mediterranean biodiversity."
        });
    }

    // Test valid city retrieval
    try {
        const result = await getFaunaFloraByCity("Barcelona");
        console.log("Found Fauna & Flora:", result);
    } catch (error) {
        console.error("Unexpected Error (Valid City):", error);
    }

    // Test city normalization
    try {
        const result = await getFaunaFloraByCity("  barcelona  ");
        console.log("Normalized City Fauna & Flora:", result);
    } catch (error) {
        console.error("Unexpected Error (Normalized City):", error);
    }

    // Test for a city that does not exist
    try {
        await getFaunaFloraByCity("Unknown City");
        console.error("Expected NotFoundError, but got success");
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log("Expected NotFoundError:", error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
    }

    // Test for invalid input (empty string)
    try {
        await getFaunaFloraByCity("");
        console.error("Expected ValidationError, but got success");
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log("Expected ValidationError:", error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
    }

    // Test for invalid input (non-string)
    try {
        await getFaunaFloraByCity(123);
        console.error("Expected ValidationError, but got success");
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log("Expected ValidationError:", error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
    }

} catch (error) {
    console.error("Unexpected test runner error:", error);
} finally {
    await db.disconnect();
    console.log("Disconnected from test database.");
}