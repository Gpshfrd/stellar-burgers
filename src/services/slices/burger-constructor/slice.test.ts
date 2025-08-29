import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import reducer, {
  addIngredient,
  clearBurgerConstructor,
  downIngredient,
  removeIngredient,
  upIngredient
} from './slice';
import { expect } from '@jest/globals';

jest.mock('uuid');

describe('burgerConstructorSlice', () => {
  const ingredient: TIngredient = {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue('test-id');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Добавление ингредиента в конструктор', () => {
    const state = reducer(undefined, addIngredient(ingredient));
    expect(state.burgerConstructor.ingredients.length).toBe(1);
    expect(state.burgerConstructor.ingredients[0].id).toBe('test-id');
  });

  it('Удаление ингредиента из конструктора', () => {
    let startState = reducer(undefined, addIngredient(ingredient));
    const toRemove = startState.burgerConstructor.ingredients[0];
    const state = reducer(startState, removeIngredient(toRemove));

    expect(state.burgerConstructor.ingredients.length).toBe(0);
  });

  it('Перемещение ингредиента вверх в конструкторе', () => {
    let state = reducer(undefined, addIngredient(ingredient));
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('id-1')
      .mockReturnValueOnce('id-2');
    state = reducer(state, addIngredient(ingredient));

    const before = [...state.burgerConstructor.ingredients];
    state = reducer(state, upIngredient(1));

    expect(state.burgerConstructor.ingredients[0].id).toBe(before[1].id);
    expect(state.burgerConstructor.ingredients[1].id).toBe(before[0].id);
  });

  it('Перемещение ингредиента вниз в конструкторе', () => {
    let state = reducer(undefined, addIngredient(ingredient));
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('id-1')
      .mockReturnValueOnce('id-2');
    state = reducer(state, addIngredient(ingredient));

    const before = [...state.burgerConstructor.ingredients];
    state = reducer(state, downIngredient(0));

    expect(state.burgerConstructor.ingredients[1].id).toBe(before[0].id);
    expect(state.burgerConstructor.ingredients[0].id).toBe(before[1].id);
  });

  it('Очистка конструктора', () => {
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('bun-id')
      .mockReturnValueOnce('id-1');

    let state = reducer(undefined, addIngredient(ingredient));
    state = reducer(state, clearBurgerConstructor());

    expect(state.burgerConstructor.bun).toBeNull();
    expect(state.burgerConstructor.ingredients.length).toBe(0);
  });
});
