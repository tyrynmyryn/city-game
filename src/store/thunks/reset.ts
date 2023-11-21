import { createAsyncThunk } from "@reduxjs/toolkit";

import { resetCities } from "@/store/cities";
import { resetPlayers } from "@/store/players";
import { resetRules } from "@/store/rules";

export const resetGameState = createAsyncThunk('resetGame', (_, { dispatch }) => {
  dispatch(resetCities())
  dispatch(resetPlayers())
  dispatch(resetRules())
})