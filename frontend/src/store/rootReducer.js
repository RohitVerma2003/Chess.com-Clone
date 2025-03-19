import { combineReducers } from "@reduxjs/toolkit";
import boardSlice from "./Slices/board";
import selectedPieceSlice from "./Slices/selectedPiece";

export const rootReducer = combineReducers({
    boardSlice: boardSlice,
    selectedPieceSlice: selectedPieceSlice
})