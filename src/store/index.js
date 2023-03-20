import { configureStore } from "@reduxjs/toolkit";
import slice from '../components/App/AppSlice'
const store = configureStore({
  reducer: { slice },
  devTools: process.env.NODE_ENV !== 'production'
})
export default store;
