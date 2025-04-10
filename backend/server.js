import express from 'express';
import { app, server } from './Socket/socket.js';
import path from 'path';

const PORT = 5000;
app.use(express.json());

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname , "/frontend/dist")));
app.get("*" , (req,res)=>{
    res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"));
})

server.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});