import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  carsData: [],
  priceFiltr: [],
  mileageFiltr: [],
};
const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData(state, action) {
      state.data = [...state.data, action.payload];
    },
    addCarsData(state, action) {
      state.carsData = [...state.carsData, action.payload];
    },
    filtrPrice(state, action) {
      state.data = [...state.priceFiltr, action.payload];
      console.log(action.payload);
    },
    filtrMileage(state, action) {
      state.data = [...state.mileageFiltr, action.payload];
    },
  },
});
export const { addData, addCarsData, filtrMileage, filtrPrice } =
  DataSlice.actions;
export default DataSlice.reducer;
