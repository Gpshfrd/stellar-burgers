import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);
