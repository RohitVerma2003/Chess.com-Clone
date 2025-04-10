import { Chess } from 'chess.js'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Board from './components/Board'
import { useDispatch } from 'react-redux'
import { updateBoard } from './store/Slices/board'

const App = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io('http://localhost:5000')
    setSocket(socket)
  }, [])

  console.log(socket?.connected)
  let chess = new Chess()
  const [playerRole, setPlayerRole] = useState(null)
  const dispatch = useDispatch()

  socket?.on('playerRole', role => {
    setPlayerRole(role?.playerRole)
    console.log(`You are ${role}`)
    dispatch(updateBoard(role?.board))
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
    alert(`Game Over Winner is : ${userTurn}`)
    chess = new Chess()
    dispatch(updateBoard(chess.board()))
  })

  return (
    <div
      className={`w-full flex justify-center items-center my-5 ${
        playerRole === 'b' ? 'rotate-180' : ''
      }`}
    >
      <Board playerRole={playerRole} socket={socket} />
    </div>
  )
}

export default App
