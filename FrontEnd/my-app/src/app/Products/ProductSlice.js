import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./ProductAPI";

const initialState = {
  productList: [],
  singleProd: [],
  status: "idle",
};

// Async methodes
export const getProductAsync = createAsyncThunk(
  "product/getProduct",
  async (category_id) => {
    const response = await getProduct(category_id);
    // console.log(response.data);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (newData) => {
    const response = await addProduct(newData.tempProd, newData.token);
    // console.log(response.data);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (newData) => {
    const response = await deleteProduct(newData.id, newData.token);
    // console.log(response)
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (newData) => {
    const response = await updateProduct(
      newData.tempProd,
      newData.id,
      newData.token
    );
    // console.log(response.data);
    return response.data;
  }
);

// category method
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getOneProduct: (state, action) => {
      state.singleProd = state.productList.filter(
        (prod) => prod._id == action.payload
        
      );   

    },
    
  },
  extraReducers: (builder) => {
    builder

      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = "Done";
        state.productList = action.payload;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action.payload);
        state.productList = [...state.productList, action.payload];
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action.payload);
        state.productList = state.productList.filter(
          (x) => x.id !== action.payload
        );
      })

      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action);
        // let updProd = state.category.find((x) => x.id === action.payload.id);
        // updProd.desc = action.payload.desc;
        // updProd.price = action.payload.price;
      });
  },
});

// methods to export
export const { getOneProduct } = productSlice.actions;

// selctors to export
export const selectProductList = (state) => state.product.productList;
export const selectSingleProd = (state) => state.product.singleProd;

export default productSlice.reducer;
