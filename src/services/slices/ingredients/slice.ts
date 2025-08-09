import { TIngredient } from '@utils-types';
import reducer from '../user/slice';
import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsThunk } from './actions';

export interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isIngredientsLoadingSelector: (state) => state.isIngredientsLoading
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { ingredientsSelector, isIngredientsLoadingSelector } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
