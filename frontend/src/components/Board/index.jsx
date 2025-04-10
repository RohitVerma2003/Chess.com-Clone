import React from 'react'
import Block from '../Block'
import {useSelector} from 'react-redux'

const Board = ({ playerRole , socket }) => {
    const {board} = useSelector((state)=>state.boardSlice)
  return (
    <div>
      {board?.map((row, rowIndex) => (
        <div className='flex justify-center items-center' key={rowIndex}>
          {row.map((col , colIndex)=>(
          <Block key={colIndex} block={col} colIndex={colIndex} rowIndex={rowIndex} playerRole={playerRole} socket={socket}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
