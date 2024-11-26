import express from "express"; // ES module import
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const apiKey = process.env.API_KEY;
const piston = process.env.PISTON_ENDPOINT;

const PORT = 8080;

// Initialize the Express app by invoking express()
const app = express();

app.use(cors());

app.use(express.json()); // Use express middleware to parse JSON

const openai = new OpenAI({
  apiKey: apiKey,
});

async function fetchCompletion(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching completion:", error);
    return "Error fetching response.";
  }
}

async function runCode(code) {
  try {
    const response = await axios.post(piston, {
      language: "python",
      version: "3.10.0",
      files: [
        {
          content: code,
        },
      ],
    });

    return response.data.run.output;
  } catch (error) {
    console.error("Error running code:", error);
    return "Error executing code.";
  }
}

app.post("/api/runCode", async (req, res) => {
  const output = await runCode(req.body.code);
  res.json({ output });
});

app.post("/api/ask", async (req, res) => {
  const prompt = req.body.prompt;
  const answer = await fetchCompletion(prompt);
  res.json({ answer });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
