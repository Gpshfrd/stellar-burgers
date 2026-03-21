import * as authTokens from '../fixtures/token.json';
import * as orderData from '../fixtures/order.json';
import type {} from "cypress";

const testURL = "/";

const BUN_KRAT = "Краторная булка N-200i";
const BUN_FLUO = "Флюоресцентная булка R2-D3";
const MAIN_BIO = "Биокотлета из марсианской Магнолии";
const MAIN_FALL = "Плоды Фалленианского дерева";

const SELECTORS = {
  constructor: "[data-cy=constructor]",
  modal: "[data-cy=modal]",
  closeButton: "[data-cy=close-button]",
  overlay: "[data-cy=modal-overlay]"
};

describe("Интеграционные тесты", () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.setCookie('accessToken', authTokens.accessToken);
    localStorage.setItem('refreshToken', authTokens.refreshToken);
    cy.intercept('POST', '**/api/auth/tokens', {
      fixture: 'token.json'
    });
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" });
    cy.visit(testURL);
  });

  afterEach(() => {
    cy.clearAllCookies();
    localStorage.removeItem('refreshToken');
  });

  describe("Тестирование добавления ингредиента из списка в конструктор", () => {
    it("Добавление булки и начинки", () => {
      cy.contains(BUN_KRAT).parents("li").find("button").click();
      cy.get(SELECTORS.constructor).should("contain.text", BUN_KRAT);

      cy.contains(MAIN_BIO).parents("li").find("button").click();
      cy.get(SELECTORS.constructor).should("contain.text", MAIN_BIO);
    })
  });

  describe("Тестирование модальных окон", () => {
    it("Открытие модального окна ингредиента", () => {
      cy.contains(BUN_KRAT).click();
      cy.get(SELECTORS.modal).should("contain.text", "Детали ингредиента");
    });

    it("Закрытие модального окна по нажатию на крестик", () => {
      cy.contains(BUN_KRAT).click();
      cy.get(SELECTORS.modal).should("contain.text", "Детали ингредиента");
      cy.get(SELECTORS.closeButton).click();
      cy.get(SELECTORS.modal).should("not.exist");
    });

    it("Закрытие модального окна по нажатию на оверлей", () => {
      cy.contains(BUN_KRAT).click();
      cy.get(SELECTORS.modal).should("contain.text", "Детали ингредиента");
      cy.get(SELECTORS.overlay).click({ force: true });
      cy.get(SELECTORS.modal).should("not.exist");
    });

    it("Модальное окно содержит данные выбранного ингредиента", () => {
      cy.contains(BUN_KRAT).click();
      cy.get(SELECTORS.modal).should("contain.text", BUN_KRAT);
    });
  })

  describe("Тестирование создания заказа", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/api/orders", { fixture: "order.json" });

      cy.contains(BUN_FLUO).parents("li").find("button").click();
      cy.contains(MAIN_BIO).parents("li").find("button").click();
      cy.contains(MAIN_FALL).parents("li").find("button").click();
    })

    it("Клик по кнопке Оформить заказ и проверка модального окна с заказом", () => {
      cy.contains("Оформить заказ").click();

      cy.get(SELECTORS.modal).should("contain.text", "Ваш заказ начали готовить");
      cy.get(SELECTORS.modal).should("contain.text", orderData.order.number);

      cy.get(SELECTORS.closeButton).click();
      cy.get(SELECTORS.modal).should("not.exist");

      cy.get(SELECTORS.constructor).should("not.contain.text", BUN_FLUO);
      cy.get(SELECTORS.constructor).should("not.contain.text", MAIN_BIO);
      cy.get(SELECTORS.constructor).should("not.contain.text", MAIN_FALL);
    });
  })
});
