import { orderBurgerThunk } from './actions';
import reducer, {
  initialState,
  clearOrder,
  clearPendingOrderData,
  setPendingOrderData
} from './slice';
import { expect } from '@jest/globals';

describe('orderSlice', () => {
  const mockOrder = {
    number: 1,
    name: 'burgr',
    ingredients: ['1', '2'],
    _id: '1',
    status: 'done',
    createdAt: '2023-10-01T00:00:00.000Z',
    updatedAt: '2023-10-01T00:00:00.000Z'
  };

  describe('orderBurgerThunk', () => {
    it('pending', () => {
      const action = { type: orderBurgerThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isOrderLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.order).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: orderBurgerThunk.fulfilled.type,
        payload: { order: mockOrder }
      };
      const state = reducer({ ...initialState, isOrderLoading: true }, action);

      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.order).toEqual(mockOrder);
    });

    it('rejected', () => {
      const action = {
        type: orderBurgerThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer({ ...initialState, isOrderLoading: true }, action);

      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe('Error fetching');
      expect(state.order).toBeNull();
    });
  });

  describe('reducers', () => {
    it('clearOrder', () => {
      const action = clearOrder();
      const state = reducer(
        {
          ...initialState,
          order: mockOrder,
          isOrderLoading: true,
          error: 'Error fetching'
        },
        action
      );

      expect(state.order).toBeNull();
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('setPendingOrderData', () => {
      const action = setPendingOrderData(['1', '2']);
      const state = reducer(initialState, action);

      expect(state.pendingOrderData).toEqual(['1', '2']);
    });

    it('clearPendingOrderData', () => {
      const action = clearPendingOrderData();
      const state = reducer(
        { ...initialState, pendingOrderData: ['1'] },
        action
      );

      expect(state.pendingOrderData).toBeNull();
    });
  });
});
