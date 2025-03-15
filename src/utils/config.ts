export default {
    NEXT_API_URL: process.env.NEXT_API_URL || "http://localhost:3000/api",
    NODE_ENV: process.env.NODE_ENV || "development",
    GOOGLE_ID: process.env.AUTH_GOOGLE_ID || "",
    GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET || "",
}