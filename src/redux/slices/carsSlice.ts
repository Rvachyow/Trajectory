import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { CarsDataType } from "../../types/CarsDataType";
import { CarsDataSliceType } from "../sliceTypes";

export const getCars = createAsyncThunk("cars/getAllItems", async () => {
  const { data } = await axios("/test-task/vehicles");
  return data;
});

const initialState: CarsDataSliceType = {
  data: [],
  filtered: [],
  status: "loading",
  isSorted: false,
};

const carsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    sortBy: (
      state,
      action: PayloadAction<{ sortType: keyof CarsDataType }>,
    ) => {
      if (state.isSorted) {
        state.filtered = state.data.sort((a, b) => {
          state.isSorted = false;
          if (a[action.payload.sortType] < b[action.payload.sortType]) {
            return 1;
          }
          return -1;
        });
      } else
        state.filtered = state.data.sort((a, b) => {
          state.isSorted = true;
          if (a[action.payload.sortType] < b[action.payload.sortType]) {
            return -1;
          }
          return 1;
        });
    },
    createCarList: (state, action) => {
      const { id, name, model, year, color, price, latitude, longitude } =
        action.payload.value;
      const modelCar: CarsDataType = {
        id: parseInt(id, 10),
        name: name,
        year: year,
        model: model,
        color: color,
        price: price,
        latitude: latitude,
        longitude: longitude,
      };

      state.data = [modelCar, ...state.data];
      state.filtered = state.data;
    },
    deleateCarList: (state, action) => {
      state.data = state.data.filter(
        (item: CarsDataType) => action.payload !== item.id,
      );
      state.filtered = state.data;
    },
    editCarList: (state, action) => {
      const { name, model, year, color, price, latitude, longitude } =
        action.payload.value;

      const modelCar: CarsDataType = {
        id: action.payload.id,
        name: name,
        year: year,
        model: model,
        color: color,
        price: price,
        latitude: latitude,
        longitude: longitude,
      };

      state.data = state.data.map((item): CarsDataType => {
        if (item.id === action.payload.id) {
          item = modelCar;
        }
        return item;
      });
      state.filtered = state.data;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })

      .addCase(getCars.fulfilled, (state, action) => {
        state.data = action.payload;
        state.filtered = action.payload;
        state.status = "loaded";
      })

      .addCase(getCars.rejected, (state) => {
        state.data = [];
      });
  },
});

export const carsReducer = carsSlice.reducer;
export const { sortBy, createCarList, deleateCarList, editCarList } =
  carsSlice.actions;
