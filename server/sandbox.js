require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash"});

async function run() {
    const prompt = "Example how AI works in a few words";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

run()