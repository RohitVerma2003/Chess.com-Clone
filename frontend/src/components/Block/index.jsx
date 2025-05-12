import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPiece, setSourceBlock } from '../../store/Slices/selectedPiece'

const Block = ({ block, rowIndex, colIndex, playerRole, socket }) => {
  const dispatch = useDispatch()
  const { sourceBlock, selectedPiece } = useSelector(
    state => state.selectedPieceSlice
  )

  const getPieceImage = (type, color) => {
    const key = `${type}${color}`
    const images = {
      pb: '♟',
      pw: '♙',
      rb: '♜',
      rw: '♖',
      nb: '♞',
      nw: '♘',
      bb: '♝',
      bw: '♗',
      qb: '♛',
      qw: '♕',
      kb: '♚',
      kw: '♔'
    }
    return images[key] || ''
  }

  const handleDragStart = e => {
    if (e.target.draggable) {
      if (e.target.draggable) {
        const pieceData = { type: block.type, color: block.color }
        e.dataTransfer.setData('string', JSON.stringify(pieceData))
        dispatch(selectPiece(pieceData))
        dispatch(setSourceBlock({ row: rowIndex, col: colIndex }))
      }
    }
  }

  const handleDragEnd = () => {
    dispatch(selectPiece(null))
    dispatch(setSourceBlock(null))
  }

  const handleMove = (sourceBlock, targetSource) => {
    const move = {
      from: `${String.fromCharCode(97 + sourceBlock.col)}${
        8 - sourceBlock.row
      }`,
      to: `${String.fromCharCode(97 + targetSource.col)}${
        8 - targetSource.row
      }`,
      promotion: 'q'
    }

    socket.emit('move', move)
  }

  const handleDrop = e => {
    e.preventDefault()
    if (selectedPiece) {
      const targetSource = {
        row: parseInt(e.target.dataset.row),
        col: parseInt(e.target.dataset.col)
      }

      handleMove(sourceBlock, targetSource)
    }
  }

  return (
    <div
      className={`w-10 h-10 md:w-20 md:h-20 flex justify-center items-center ${
        (rowIndex + colIndex) % 2 === 0 ? 'bg-white' : 'bg-[#81b64c]'
      }`}
      data-row={rowIndex}
      data-col={colIndex}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      {block && (
        <div
          draggable={playerRole === block?.color || 'none'}
          data-row={rowIndex}
          data-col={colIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className={`${playerRole === 'b' ? 'rotate-180' : ''} text-3xl`}
        >{getPieceImage(block.type, block.color)}</div>
      )}
    </div>
  )
}

export default Block
