import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store/index';
import { Views } from '@/types';

interface State {
  view: Views;
}

const initialState: State = {
  view: Views.INTRO,
};

export const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    changeViewTo: (state, { payload }: PayloadAction<Views>) => {
      state.view = payload;
    },
  },
});
export const contentView = (state: RootState) => state.views.view;
export const { changeViewTo } = viewsSlice.actions;

export default viewsSlice.reducer;
