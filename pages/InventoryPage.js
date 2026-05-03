class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async addItemToCartByName(name) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.locator('button').click();
  }

  async removeItemFromCartByName(name) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartCount() {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.innerText();
    return parseInt(text);
  }
}

module.exports = { InventoryPage };