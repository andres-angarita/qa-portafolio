const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test('flujo completo de compra finaliza con confirmación', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.finish();
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });

  test('checkout sin nombre muestra error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('', 'Doe', '12345');
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('checkout sin apellido muestra error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('John', '', '12345');
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('checkout sin código postal muestra error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('John', 'Doe', '');
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

});