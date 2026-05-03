const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('añadir un producto actualiza el contador del carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('añadir dos productos muestra contador en 2', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('eliminar un producto actualiza el contador', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test('el carrito persiste al navegar al catálogo', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.goBack();
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

});