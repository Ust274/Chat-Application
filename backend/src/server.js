import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './utils/mongo.js';
import router from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import Messagerouter from './routes/messsages.routes.js';
import {app,hServer} from './utils/socket.js'
import path from 'path';

dotenv.config()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/auth', router);
app.use('/api/messages',Messagerouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

hServer.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
});