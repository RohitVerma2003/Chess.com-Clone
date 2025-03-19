import { Chess } from 'chess.js'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Board from './components/Board'
import { useDispatch } from 'react-redux'
import { updateBoard } from './store/Slices/board'

const App = () => {
  const [socket , setSocket] = useState(null);

  useEffect(()=>{
    const socket = io('http://localhost:5000')
    setSocket(socket);
  } , [])

  console.log(socket?.connected)
  const chess = new Chess()
  const [playerRole, setPlayerRole] = useState(null)
  const dispatch = useDispatch()

  socket?.on('playerRole', role => {
    setPlayerRole(role)
    console.log(`You are ${role}`)
    dispatch(updateBoard(chess.board()))
  })

  socket?.on('boardState', fen => {
    chess.load(fen)
    dispatch(updateBoard(chess.board()))
  })

  socket?.on('move', move => {
    chess.move(move)
    dispatch(updateBoard(chess.board()))
  })

  socket?.on('gameOver', userTurn => {
    alert('Game Over Winner is : ' , userTurn)
  })

  return (
    <div className='w-full flex justify-center my-5'>
      <Board playerRole={playerRole} socket={socket} />
    </div>
  )
}

export default App
