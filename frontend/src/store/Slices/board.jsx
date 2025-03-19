import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: {
    board: null
  },
  reducers: {
    updateBoard: (state, action) => {
      state.board = action.payload
    }
  }
})

export const { updateBoard } = boardSlice.actions
export default boardSlice.reducer
