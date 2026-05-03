const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';

test.describe('Authentication', () => {

  test('login con credenciales válidas redirige al catálogo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/inventory/);
  });

  test('login con contraseña incorrecta muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('login con usuario bloqueado muestra error específico', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', VALID_PASS);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('login sin credenciales muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
  });

});