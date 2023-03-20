import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyList: null,
  currentRates: null,
  binanceExchangeVolume: null,
  twentyFourHoursData: null,
  oneMonthData: null,
  animationState: false
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers:
  {
    addCurrencyList: (state, action) => { state.currencyList = action.payload },
    addCurrentRates: (state, action) => { state.currentRates = action.payload },
    addBinanceExchangeVolume: (state, action) => { state.binanceExchangeVolume = action.payload },
    addTwentyFourHoursData: (state, action) => { state.twentyFourHoursData = { ...action.payload } },
    addOneMonthData: (state, action) => { state.oneMonthData = { ...action.payload } },
    addAnimationState: (state, action) => { state.animationState = action.payload }
  },
});

const { actions, reducer } = slice;
export default reducer;
export const {
  addCurrencyList,
  addCurrentRates,
  addBinanceExchangeVolume,
  addTwentyFourHoursData,
  addOneMonthData,
  addAnimationState
} = actions
