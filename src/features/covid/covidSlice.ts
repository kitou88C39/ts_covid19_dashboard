import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import dataDaily from './apiDataDaily.json';

//パスを定義する
const apiUrl = 'https://api.covid19api.com/total/country';

//データ型を定義する　typeofで取得してtypeで定義する

type DATADAILY = typeof dataDaily;

//covidSliceのstateを定義する
type covidState = {
  daily: DATADAILY;
  country: string;
};

//initialStateを定義する
const initialState: covidState = {
  daily: dataDaily,
  country: 'Japan',
};

//非同期関数を作成する
export const fetchAsyncGetDaily = createAsyncThunk(
  'covid/getDaily',
  async (country: string) => {
    const { data } = await axios.get<DATADAILY>(`${apiUrl}/${country}`);
    return { data: data, country: country };
  }
);

//createSliceでcreateの実態を作成する
const covidSlice = createSlice({
  name: 'covid',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        daily: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

export const selectDaily = (state: RootState) => state.covid.daily;
export const selectCountry = (state: RootState) => state.covid.country;

export default covidSlice.reducer;
