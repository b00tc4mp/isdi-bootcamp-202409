import "dotenv/config";
import db from "dat";
import getDiscovery from "./getDiscovery.js";

await db.connect(process.env.MONGO_URL_TEST);

try {
    console.log("Running getDiscovery tests...");

    // Check if test data exists before inserting
    let discoveryData = await Discovery.findOne({ city: "barcelona" });

    if (!discoveryData) {
        console.log("No existing discovery data found for Barcelona, inserting test data...");
        await Discovery.create({
            city: "barcelona",
            description: "Barcelona is a vibrant city with diverse marine life and rich diving spots."
        });
    }

    // Test valid city retrieval
    try {
        const result = await getDiscovery("Barcelona");
        console.log("Found Discovery Data:", result);
    } catch (error) {
        console.error("Unexpected Error (Valid City):", error);
    }

    // Test city normalization (should still find the same city)
    try {
        const result = await getDiscovery("  barcelona  ");
        console.log("Normalized City Discovery Data:", result);
    } catch (error) {
        console.error("Unexpected Error (Normalized City):", error);
    }

    // Test for a city that does not exist
    try {
        await getDiscovery("Unknown City");
        console.error("Expected NotFoundError, but got success!");
    } catch (error) {
        console.log("Expected NotFoundError:", error.message);
    }

    // Test for invalid input (empty string)
    try {
        await getDiscovery("");
        console.error("Expected ValidationError, but got success!");
    } catch (error) {
        console.log("Expected ValidationError:", error.message);
    }

    // Test for invalid input (non-string)
    try {
        await getDiscovery(123);
        console.error("Expected ValidationError, but got success!");
    } catch (error) {
        console.log("Expected ValidationError:", error.message);
    }

} catch (error) {
    console.error("Unexpected test runner error:", error);
} finally {
    await db.disconnect();
    console.log("Disconnected from test database.");
}