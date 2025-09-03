import reducer, { initialState } from './slice';
import { getIngredientsThunk } from './actions';
import { TIngredient } from '@utils-types';
import { expect } from '@jest/globals';

describe('ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url'
    }
  ];

  it('Pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('Fullfilled', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(
      { ...initialState, isIngredientsLoading: true },
      action
    );

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('Rejected', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Error fetching' }
    };
    const state = reducer(
      { ...initialState, isIngredientsLoading: true },
      action
    );

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe('Error fetching');
    expect(state.ingredients).toEqual([]);
  });
});
