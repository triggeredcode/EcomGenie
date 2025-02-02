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

// const corsOptions = {
//     origin: process.env.FRONTEND_URL,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

// app.use(cors)

const groq = new Groq({ apiKey: process.env["GROQ_API_KEY"] });
const serviceAdapter = new GroqAdapter({
    groq,
    model: "llama-3.1-8b-instant",
});

// const productionServer = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

// if (productionServer) {
//     app.use((req, res, next) => {
//         const origin = req.headers.origin;
//         const frontendUrl = process.env.FRONTEND_URL;

//         console.log(`Request Origin: ${origin}`);
//         console.log(`Frontend URL: ${frontendUrl}`);

//         if (origin !== frontendUrl) {
//             console.log(`Forbidden access from origin: ${origin}`);
//             return res.status(403).send("Forbidden");
//         }

//         next();
//     });
// }

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
