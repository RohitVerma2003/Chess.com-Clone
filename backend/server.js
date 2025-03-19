import express from 'express';
import { app, server } from './Socket/socket.js';

const PORT = 5000;
app.use(express.json());

server.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});