import * as authTokens from '../fixtures/token.json';
import * as orderData from '../fixtures/order.json';

describe("Интеграционные тесты", () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.setCookie('accessToken', authTokens.accessToken);
    localStorage.setItem('refreshToken', authTokens.refreshToken);
    cy.intercept('POST', '**/api/auth/tokens', {
      fixture: 'token.json'
    });
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" });
    cy.visit("http://localhost:4000/");
  });

  afterEach(() => {
    cy.clearAllCookies();
    localStorage.removeItem('refreshToken');
  });

  describe("Тестирование добавления ингредиента из списка в конструктор", () => {
    it("Добавление булки и начинки", () => {
      cy.contains("Краторная булка N-200i").parents("li").find("button").click();
      cy.get("[data-cy=constructor]").should("contain.text", "Краторная булка N-200i");

      cy.contains("Биокотлета из марсианской Магнолии").parents("li").find("button").click();
      cy.get("[data-cy=constructor]").should("contain.text", "Биокотлета из марсианской Магнолии");
    })
  });

  describe("Тестирование модальных окон", () => {
    it("Открытие модального окна ингредиента", () => {
      cy.contains("Краторная булка N-200i").click();
      cy.get("[data-cy=modal]").should("contain.text", "Детали ингредиента");
    });

    it("Закрытие модального окна по нажатию на крестик", () => {
      cy.contains("Краторная булка N-200i").click();
      cy.get("[data-cy=modal]").should("contain.text", "Детали ингредиента");
      cy.get("[data-cy=close-button]").click();
      cy.get("[data-cy=modal]").should("not.exist");
    });

    it("Закрытие модального окна по нажатию на оверлей", () => {
      cy.contains("Краторная булка N-200i").click();
      cy.get("[data-cy=modal]").should("contain.text", "Детали ингредиента");
      cy.get("[data-cy=modal-overlay]").click({ force: true });
      cy.get("[data-cy=modal]").should("not.exist");
    });

    it("Модальное окно содержит данные выбранного ингредиента", () => {
      cy.contains("Краторная булка N-200i").click();
      cy.get("[data-cy=modal]").should("contain.text", "Краторная булка N-200i");
    });
  })

  describe("Тестирование создания заказа", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/api/orders", { fixture: "order.json" });

      cy.contains("Флюоресцентная булка R2-D3").parents("li").find("button").click();
      cy.contains("Биокотлета из марсианской Магнолии").parents("li").find("button").click();
      cy.contains("Плоды Фалленианского дерева").parents("li").find("button").click();
    })

    it("Клик по кнопке Оформить заказ и проверка модального окна с заказом", () => {
      cy.contains("Оформить заказ").click();

      cy.get("[data-cy=modal]").should("contain.text", "Ваш заказ начали готовить");
      cy.get("[data-cy=modal]").should("contain.text", orderData.order.number);

      cy.get("[data-cy=close-button]").click();
      cy.get("[data-cy=modal]").should("not.exist");

      cy.get("[data-cy=constructor]").should("not.contain.text", "Флюоресцентная булка R2-D3");
      cy.get("[data-cy=constructor]").should("not.contain.text", "Биокотлета из марсианской Магнолии");
      cy.get("[data-cy=constructor]").should("not.contain.text", "Плоды Фалленианского дерева");
    });
  })
});
