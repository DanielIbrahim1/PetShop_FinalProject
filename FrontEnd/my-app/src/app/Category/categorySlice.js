import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./categoryAPI";

const initialState = {
  categoryList: [],
  status: "idle",
};

// Async methodes
export const getCategoryAsync = createAsyncThunk(
  "category/getCategory",
  async () => {
    const response = await getCategory();
    // console.log(response.data);
    return response.data;
  }
);

export const addCategoryAsync = createAsyncThunk(
  "category/addCategory",
  async (newData) => {
    const response = await addCategory(newData.tempCat, newData.token);
    // console.log(response.data);
    return response.data;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "category/deleteCategory",
  async (newData) => {
    const response = await deleteCategory(newData.id, newData.token);
    // console.log(response)
    return response.data;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "category/updateCategory",
  async (newData) => {
    const response = await updateCategory(
      newData.tempCat,
      newData.id,
      newData.token
    );
    return response.data;
  }
);

// category method
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        state.status = "Done";
        // console.log(action.payload);
        state.categoryList = action.payload;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action.payload);
        state.categoryList = [...state.categoryList, action.payload];
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action.payload);
        state.categoryList = state.categoryList.filter(
          (x) => x.id !== action.payload
        );
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = "Done";
        console.log(action);
        // let updProd = state.category.find((x) => x.id === action.payload.id);
        // updProd.desc = action.payload.desc;
        // updProd.price = action.payload.price;
      });
  },
});

// methods to export
// export const {  } = shopSlice.actions;

// selctors to export
export const selectCategoryList = (state) => state.category.categoryList;

export default categorySlice.reducer;
