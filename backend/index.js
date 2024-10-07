const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

dotenv.config();

const { CopilotRuntime, GroqAdapter, copilotRuntimeNodeHttpEndpoint} = require('@copilotkit/runtime')
const Groq = require("groq-sdk");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const groq = new Groq({ apiKey: process.env["GROQ_API_KEY"] });
const serviceAdapter = new GroqAdapter({
    groq,
    model: "llama3-groq-8b-8192-tool-use-preview",
});

const productionserver = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

if(productionserver) {
    app.use((req, res, next) => {
        const origin = req.headers.origin;

        if (origin !== process.env["FRONTEND_URL"]) {
            return res.status(403).send("Forbidden");
        }
        next();
    }) 
}

app.use("/api/copilotkit", async (req, res, next) => {
    try {
        const runtime = new CopilotRuntime();
        const handler = copilotRuntimeNodeHttpEndpoint({
            endpoint: "/copilotkit",
            runtime,
            serviceAdapter: serviceAdapter,
        });

        return handler(req, res, next);
    } catch (err) {
        console.error("Error handling CopilotKit request:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', async (req, res) => {
    res.send('Genie Backend Server running...');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
