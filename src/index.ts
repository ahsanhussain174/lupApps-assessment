import express from 'express';
import "./config/app.config";
import router from './routes/app.routes';

const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app running on http://localhost:${PORT}`))