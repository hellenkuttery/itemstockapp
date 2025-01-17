import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    loading: false,
    error: false,
    firms: [],
    brands: [],
    purchases:[],
    categories: [],
    products: [],
    sales: [],
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    stockSuccess: (state, { payload: { data, url } }) => {
      // state[payload.url]=payload.data.data
      state[url] = data.data;
      state.loading = false;
      state.error = false;
    },
    getProductsCatBrandsSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.categories = payload[1];
      state.brands = payload[2];
    },
    getFirmsBrandsProductsSuccess: (state, { payload }) => {
      state.loading = false;
      state.purchases = payload[0];
      state.firms = payload[1];
      state.brands= payload[2];
      state.products = payload[3];
    },
    getPurcSalesSuccess: (state, { payload }) => {
      state.loading = false;
      state.purchases = payload[0];
      state.sales = payload[1];
    },
  },
});

export const {
  fetchFail,
  fetchStart,
  stockSuccess,
  getProductsCatBrandsSuccess,
  getFirmsBrandsProductsSuccess,
  getPurcSalesSuccess,
} = stockSlice.actions;

export default stockSlice.reducer;
