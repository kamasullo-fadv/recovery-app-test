import express, { Application, Request, Response, NextFunction } from 'express';
import OpenAI from "openai";

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
});

app.post('/chat', async (req: any, res: any) => {
    console.log("starting chat with req:", req);
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: userMessage }],
            model: "gpt-4o-mini",
        });
        res.status(200).send({ message: response.choices[0].message.content });
    } catch (error: any) {
        console.error(error);
        res.status(500).send('Error communicating with LLM');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});