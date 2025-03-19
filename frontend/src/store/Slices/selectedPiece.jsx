import { createSlice } from "@reduxjs/toolkit";

export const selectedPieceSlice = createSlice({
    name:'selectedPieceSlice',
    initialState : {
        selectedPiece : null,
        sourceBlock : null
    },
    reducers : {
        selectPiece : (state, action) => {
            state.selectedPiece = action.payload
        },
        deselectPiece : (state) => {
            state.selectedPiece = null
        },
        setSourceBlock : (state, action) => {
            state.sourceBlock = action.payload
        },
    }
});

export const { selectPiece, deselectPiece , setSourceBlock } = selectedPieceSlice.actions;
export default selectedPieceSlice.reducer;