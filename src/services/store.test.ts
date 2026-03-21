import { rootReducer } from './store';
import { expect } from '@jest/globals';

describe('rootReducer', () => {
  it('Инициализируется с корректными слайсами', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('user');
  });
});
