import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkout, getOrders, getorderDetails } from "./orderAPI";

const initialState = {
  orderList: [],
  orderDetailList: [],
  value: 0,
  status: "idle",
};

// Async methodes
export const getOrderAsync = createAsyncThunk(
  "order/getData1",
  async (token) => {
    const response = await getOrders(token);
    // console.log(response.data);
    return response.data;
  }
);

export const getOrderDetailAsync = createAsyncThunk(
  "order/getData2",
  async (payloud) => {
    const response = await getorderDetails(payloud.id, payloud.token);
    // console.log(response.data);
    return response.data;
  }
);



export const checkoutAsync = createAsyncThunk(
  "order/checkout",
  async (data) => {
    const response = await 
    checkout(data.myCart, data.token);
    console.log(response.data);
    return response.data;
  }
);

// order method
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action.payload);
        state.orderList = action.payload;
      })
      .addCase(getOrderDetailAsync.fulfilled, (state, action) => {
        state.status = "Done";
        // console.log(action.payload);
        state.orderDetailList = action.payload;
      })
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "Done";
      });
  },
});

// methods to export
// export const { CartToSend } = orderSlice.actions;

// selctors to export
// export const selectMyOrder = (state) => state.order.myCart;
export const selectOrderList = (state) => state.order.orderList;
export const selectOrderDetailList = (state) => state.order.orderDetailList;

export default orderSlice.reducer;