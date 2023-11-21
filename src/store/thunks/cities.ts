import { createAsyncThunk } from '@reduxjs/toolkit';

import { prepareCities } from '@/helpers/helpers';
import { setCities, setValidCities } from '@/store/cities';
import { RootState } from '@/store/index';
import { Cities } from '@/types';

export const initCities = createAsyncThunk('cities/getCities', async (_, thunkAPI) => {
  const list = await fetch('./cities.txt')
    .then((res) => res.text())
    .then((data) => data.split('\n'));

  thunkAPI.dispatch(setCities(prepareCities(list)));
  thunkAPI.dispatch(updateValidCities());
});

export const updateValidCities = createAsyncThunk('cities/getValidCitis', (_, thunkAPI) => {
  const { cities, rules } = thunkAPI.getState() as RootState;
  const isValid = !cities.lastAddedCity
    ? cities.cities
    : Object.entries(cities.cities).reduce((state, [key, value]) => {
        if (key.at(0) === rules.lastValidChar && !cities.addedCities[key]) {
          state[key] = value;
        }
        return state;
      }, {} as Cities);

  thunkAPI.dispatch(setValidCities(isValid));
});
