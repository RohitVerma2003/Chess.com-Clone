import { Chess } from 'chess.js';
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    }
});

let userConnected = {};
let chess = new Chess();
const board = chess.board();
let userTurn = "w";

io.on('connection', (socket) => {
    console.log("User Connected", socket.id);

    if (!userConnected.white) {
        userConnected.white = socket.id;
        socket.emit("playerRole", {playerRole : "w" , board : chess.board()});
    }
    else if (!userConnected.black) {
        userConnected.black = socket.id;
        socket.emit("playerRole", {playerRole : "b" , board : chess.board()});
    }else socket.disconnect();

    socket.on("move", (move) => {
        try {
            if (chess.turn() === "w" && socket.id !== userConnected.white) return;
            if (chess.turn() === "b" && socket.id !== userConnected.black) return;

            const result = chess.move(move);

            if (result) {
                io.emit("move", move);
                if(chess.isGameOver()){
                    io.emit("gameOver" , userTurn === "w" ? "White" : "Black");
                    chess = new Chess()
                    return;
                }
                userTurn = chess.turn();
                io.emit("boardState", chess.fen());
            } else {
                console.log("Invalid Move");
                io.emit("invalidMove", move);
            }
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id);
        if (userConnected.white === socket.id) delete userConnected.white;
        else if (userConnected.black === socket.id) delete userConnected.black;
    })
});

export { app, io, server, userConnected };