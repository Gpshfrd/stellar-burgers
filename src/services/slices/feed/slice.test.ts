import { TOrder } from '@utils-types';
import reducer, { initialState } from './slice';
import { getFeedsThunk, getOrderByNumberThunk } from './actions';
import { expect } from '@jest/globals';

describe('feedSlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['2', '3'],
      status: 'done',
      name: 'Бургер',
      createdAt: '2025-01-10T10:00:00.000Z',
      updatedAt: '2025-01-10T10:00:00.000Z',
      number: 1
    }
  ];

  describe('getFeedsThunk', () => {
    it('pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isFeedsLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: { orders: mockOrders, total: 10, totalToday: 2 }
      };
      const state = reducer({ ...initialState, isFeedsLoading: true }, action);

      expect(state.isFeedsLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders);
    });

    it('rejected', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer({ ...initialState, isFeedsLoading: true }, action);

      expect(state.isFeedsLoading).toBe(false);
      expect(state.error).toBe('Error fetching');
      expect(state.orders).toEqual([]);
    });
  });

  describe('getOrderByNumberThunk', () => {
    it('pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isOrderLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: { orders: mockOrders }
      };
      const state = reducer({ ...initialState, isOrderLoading: true }, action);

      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.order).toEqual(mockOrders[0]);
    });

    it('rejected', () => {
      const action = {
        type: getOrderByNumberThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer({ ...initialState, isOrderLoading: true }, action);

      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe('Error fetching');
      expect(state.order).toBeNull();
    });
  });
});
