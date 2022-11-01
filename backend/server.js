import express from 'express';
import cors from 'cors';
import connectDB from './connect_mongodb.js';
import todoRoute from './routes/todoRoute.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", todoRoute);

app.listen(5000, () => console.log("Server running on port 5000."));
