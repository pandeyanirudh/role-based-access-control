import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', userRoutes)

app.get("/", (req, res) => res.send("RBAC backend running"));

const PORT = process.env.PORT || 1000;
connectDB(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is listening on port:${PORT}`)
    })
})