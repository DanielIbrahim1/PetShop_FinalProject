import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationSlice from './Authentication/authenticationSlice';
import cartSlice from './Cart/cartSlice';
import categorySlice from './Category/categorySlice';
import orderSlice from './Orders/orderSlice';
import  productSlice  from './Products/ProductSlice';
import userSlice from './User/userSlice'

export const store = configureStore({
  reducer: {

    auth: authenticationSlice,
    category: categorySlice,
    product: productSlice,
    user:userSlice,
    cart:cartSlice,
    order:orderSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
