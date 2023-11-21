import { createSlice } from '@reduxjs/toolkit';

import { Players } from '@/types';
import { RootState } from '@/store/index';

interface State {
  current: Players;
}

const initialState: State = {
  current: Object.values(Players)[0],
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setNextPlayer(state) {
      const values = Object.values(Players);
      const index = values.indexOf(state.current);
      const next = values[index + 1];

      state.current = next ? next : values[0];
    },
    resetPlayers(state) {
      Object.assign(state, initialState)
    }
  },
});

export const isYourTurnSelector = ({ players }: RootState) => players.current === Players.YOU;

export const { setNextPlayer, resetPlayers } = playersSlice.actions;

export default playersSlice.reducer;
