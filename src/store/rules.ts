import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { City, Errors } from '@/types';


interface State {
  turnTime: number;
  excludedLastChars: string[];
  lastValidChar: string;
  error: Errors | ''
}


const initialState: State = {
  turnTime: 30,
  excludedLastChars: ['ь', 'ъ', 'ы'],
  lastValidChar: '',
  error: ''
};

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setLastCityChar(state, { payload }: PayloadAction<City>) {
      let lastChar = payload.at(-1);

      if (state.excludedLastChars.includes(lastChar!)) {
        lastChar = payload.at(-2);
      }

      state.lastValidChar = lastChar!;
    },
    setError(state, { payload }: PayloadAction<Errors | ''>) {
      state.error = payload
    },
    resetRules(state) {
      Object.assign(state, initialState)
    }
  },
});

export const { setLastCityChar, setError, resetRules } = rulesSlice.actions;

export default rulesSlice.reducer;
