import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export interface burgerConstructorState {
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
}

const initialState: burgerConstructorState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state) => state.burgerConstructor
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.burgerConstructor.bun = item;
        } else {
          state.burgerConstructor.ingredients.push(item);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const ingredients = state.burgerConstructor.ingredients;
      const index = action.payload;

      if (index > 0 && index < ingredients.length) {
        const [moved] = ingredients.splice(index, 1);
        ingredients.splice(index - 1, 0, moved);
      }
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const ingredients = state.burgerConstructor.ingredients;
      const index = action.payload;

      if (index >= 0 && index < ingredients.length - 1) {
        const [moved] = ingredients.splice(index, 1);
        ingredients.splice(index + 1, 0, moved);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const id = action.payload.id;
      if (!id) return;
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (ingredient) => ingredient.id !== id
        );
    },
    clearBurgerConstructor: (state) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
    }
  }
});

export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
