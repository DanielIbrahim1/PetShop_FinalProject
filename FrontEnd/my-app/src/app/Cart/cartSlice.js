import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCart: JSON.parse(localStorage.getItem("myCart"))
    ? JSON.parse(localStorage.getItem("myCart"))
    : [],
  total_order_price: 0,
};

// cart method
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      // console.log(action.payload)
      state.myCart = JSON.parse(localStorage.getItem("myCart"))
        ? JSON.parse(localStorage.getItem("myCart"))
        : [];
      state.total_order_price = JSON.parse(localStorage.getItem("cart_total"));

      // localStorage.clear();
    },
    addItemToCart: (state, action) => {
      let validator = state.myCart.find(
        (item) => item._id === action.payload._id
      );
      console.log(action.payload)
      if (validator) {
        for (let item in state.myCart) {
          if (state.myCart[item]._id === validator._id) {
            state.myCart[item].amount += 1;
            state.myCart[item].total_price = parseInt(
              state.myCart[item].amount * state.myCart[item].price
            );
          }
        }
      } else {
        state.myCart.push(action.payload);
      }
      let tempPrice = 0;

      for (let item in state.myCart) {
        tempPrice += parseInt(state.myCart[item].total_price);
      }
      state.total_order_price = tempPrice;
      localStorage.setItem(
        "cart_total",
        JSON.stringify(state.total_order_price)
      );

      localStorage.setItem("myCart", JSON.stringify(state.myCart));
    },

    testRefresh: (state,action)=> {
      console.log(state.myCart)
    },

    decAmount: (state, action) => {
      console.log(state.myCart)
      let validator = state.myCart.find(
        (item) => item._id === action.payload._id
      );
      if (validator) {
        for (let item in state.myCart) {
          if (state.myCart[item]._id === validator._id) {
            if (state.myCart[item].amount > 1) { 
              state.myCart[item].amount -= 1 }
              else {alert('Minimum order quantity')};
            state.myCart[item].total_price = parseInt(
              state.myCart[item].amount * state.myCart[item].price
            );
          }
        }
      } else {
        state.myCart.push(action.payload);
      }
      let tempPrice = 0;

      for (let item in state.myCart) {
        tempPrice += parseInt(state.myCart[item].total_price);
      }
      state.total_order_price = tempPrice;
      localStorage.setItem(
        "cart_total",
        JSON.stringify(state.total_order_price)
      );
      localStorage.setItem("myCart", JSON.stringify(state.myCart));


      // increment amount
    },
    resetCart: (state, action) => {
      // console.log(action.payload)
      state.myCart = [];
      state.total_order_price = 0;
      console.log("cart RESET");
      localStorage.setItem(
        "cart_total",
        JSON.stringify(state.total_order_price)
      );
      localStorage.setItem("myCart", JSON.stringify(state.myCart));

      // localStorage.clear();
    },
    removeItemFromCart: (state, action) => {
      console.log("hello");
      state.myCart = state.myCart.filter((x) => x._id !== action.payload);
      let tempPrice = 0;

      for (let item in state.myCart) {
        tempPrice += parseInt(state.myCart[item].total_price);
      }
      state.total_order_price = tempPrice;
      localStorage.setItem(
        "cart_total",
        JSON.stringify(state.total_order_price)
      );
      localStorage.setItem("myCart", JSON.stringify(state.myCart));
    },
    // changeAmount: (state, action) => {
    //   console.log("i need to change amount")
    //   console.log(action.payload)
    // }
  },

  extraReducers: (builder) => { },
});

// methods to export
export const {
  addItemToCart,
  resetCart,
  removeItemFromCart,
  getCart,
  decAmount,
  changeAmount,
  testRefresh
} = cartSlice.actions;

// selctors to export
export const selectMyCart = (state) => state.cart.myCart;
export const selectTotal_order_price = (state) => state.cart.total_order_price;

// export const selectOrderList = (state) => state.order.orderList;

export default cartSlice.reducer;