import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerThunk } from './actions';

export interface OrderState {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null;
  pendingOrderData: string[] | null;
}

const initialState: OrderState = {
  order: null,
  isOrderLoading: false,
  error: null,
  pendingOrderData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    orderSelector: (state) => state.order,
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    pendingOrderDataSelector: (state) => state.pendingOrderData
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
      state.error = null;
    },
    setPendingOrderData: (state, action: PayloadAction<string[]>) => {
      state.pendingOrderData = action.payload;
    },
    clearPendingOrderData: (state) => {
      state.pendingOrderData = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.order;
      });
  }
});

export const { clearOrder, setPendingOrderData, clearPendingOrderData } =
  orderSlice.actions;
export const {
  isOrderLoadingSelector,
  orderSelector,
  pendingOrderDataSelector
} = orderSlice.selectors;
export default orderSlice.reducer;
