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
      pb: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png',
      pw: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png',
      rb: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png',
      rw: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png',
      nb: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png',
      nw: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png',
      bb: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png',
      bw: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png',
      qb: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png',
      qw: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png',
      kb: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png',
      kw: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png'
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

    console.log(move)
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
        <img
          src={getPieceImage(block.type, block.color)}
          draggable={playerRole === block.color}
          data-row={rowIndex}
          data-col={colIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className={`${playerRole === 'b' ? 'rotate-180' : ''}`}
        />
      )}
    </div>
  )
}

export default Block
