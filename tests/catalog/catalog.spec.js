const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { CatalogPage } = require('../../pages/CatalogPage');

test.describe('Catalog', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('el catálogo muestra 6 productos', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    expect(await catalogPage.getItemCount()).toBe(6);
  });

  test('ordenar por nombre Z-A invierte el orden', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const before = await catalogPage.getItemNames();
    await catalogPage.sortBy('za');
    const after = await catalogPage.getItemNames();
    expect(after).toEqual([...before].reverse());
  });

  test('ordenar por precio ascendente ordena correctamente', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.sortBy('lohi');
    const prices = await catalogPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('click en producto navega al detalle', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.clickItem('Sauce Labs Backpack');
    await expect(page).toHaveURL(/inventory-item/);
  });

});