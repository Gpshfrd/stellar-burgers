import { TOrder } from '@utils-types';
import reducer, { initialState, clearErrors } from './slice';
import {
  getOrdersThunk,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './actions';
import { expect } from '@jest/globals';

describe('user slice', () => {
  const mockUser = {
    email: 'test@ex.com',
    name: 'Test'
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'burgr',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    number: 1
  };

  describe('loginUserThunk', () => {
    it('pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.error).toBeNull();
      expect(state.loginUserRequest).toBe(true);
    });

    it('fulfilled', () => {
      const action = { type: loginUserThunk.fulfilled.type, payload: mockUser };
      const state = reducer(
        { ...initialState, loginUserRequest: true },
        action
      );

      expect(state.error).toBeNull();
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('rejected', () => {
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer(initialState, action);

      expect(state.error).toBe('Error fetching');
      expect(state.loginUserRequest).toBe(false);
    });
  });

  describe('logoutUserThunk', () => {
    it('pending', () => {
      const action = { type: logoutUserThunk.pending.type };
      const state = reducer(
        { ...initialState, user: mockUser, isAuthenticated: true },
        action
      );

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    });
  });

  describe('getUserThunk', () => {
    it('pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
    });

    it('fulfilled', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
    });

    it('rejected', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error fetching');
    });
  });

  describe('registerUserThunk', () => {
    it('pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });

    it('rejected', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer(initialState, action);

      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error fetching');
    });
  });

  describe('updateUserThunk', () => {
    it('pending', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
    });

    it('rejected', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error fetching');
    });
  });

  describe('getOrdersThunk', () => {
    it('pending', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.ordersRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: [mockOrder]
      };
      const state = reducer(initialState, action);

      expect(state.orders).toEqual([mockOrder]);
      expect(state.ordersRequest).toBe(false);
      expect(state.error).toBeNull();
    });

    it('rejected', () => {
      const action = {
        type: getOrdersThunk.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = reducer(initialState, action);

      expect(state.ordersRequest).toBe(false);
      expect(state.error).toBe('Error fetching');
    });
  });

  describe('reducers', () => {
    it('clearErrors', () => {
      const action = { type: clearErrors.type };
      const state = reducer({ ...initialState, error: 'Error' }, action);

      expect(state.error).toBeNull();
    });
  });
});
