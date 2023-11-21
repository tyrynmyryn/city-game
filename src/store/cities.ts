import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '@/store/index';
import { setNextPlayer } from '@/store/players';
import { setLastCityChar } from '@/store/rules';
import { updateValidCities } from '@/store/thunks/cities';
import { AddedCity, Cities, City, Players } from '@/types';

interface State {
  cities: Cities;
  addedCities: Record<City, AddedCity>;
  validCities: Cities;
  lastAddedCity: AddedCity | null;
  enteredCity: string;
}

type AddPayload = { city: City; by: Players };

const initialState: State = {
  cities: {},
  addedCities: {},
  validCities: {},
  lastAddedCity: null,
  enteredCity: '',
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities(state, { payload }: PayloadAction<Cities>) {
      state.cities = payload;
    },
    add(state, { payload }: PayloadAction<AddPayload>) {
      const { by, city } = payload;
      if (!city) return 

      const value = city.toLowerCase();
      const selected = state.cities[value];

      const added = { value, by, display: selected };
      state.lastAddedCity = added;
      state.addedCities[value] = added;
    },
    setEnteredCity: (state, { payload }: PayloadAction<string>) => {
      state.enteredCity = payload;
    },
    setValidCities(state, { payload }: PayloadAction<Cities>) {
      state.validCities = payload;
    },
    resetCities(state) {
      Object.assign(state, initialState)
    }
  },
});

export const addCity = (payload: AddPayload) => (dispatch: AppDispatch) => {
  dispatch(add(payload));
  dispatch(setLastCityChar(payload.city));
  dispatch(setNextPlayer());
  dispatch(updateValidCities());
};

export const addedCitiesCountSelector = ({ cities }: RootState) =>
  Object.keys(cities.addedCities).length;

export const hasValidCitiesSelector = ({ cities }: RootState) =>
  !!Object.keys(cities.validCities).length

export const { add, setEnteredCity, setValidCities, setCities, resetCities } = citiesSlice.actions;
export default citiesSlice.reducer;
