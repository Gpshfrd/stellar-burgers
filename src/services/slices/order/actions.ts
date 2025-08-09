import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const orderBurgerThunk = createAsyncThunk(
  'orders/postOrderBurger',
  async (data: string[]) => orderBurgerApi(data)
);
