class CatalogPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames() {
    return await this.itemNames.allInnerTexts();
  }

  async getItemPrices() {
    const priceTexts = await this.itemPrices.allInnerTexts();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async getItemCount() {
    return await this.inventoryItems.count();
  }

  async clickItem(name) {
    await this.page.locator('.inventory_item_name').filter({ hasText: name }).click();
  }
}

module.exports = { CatalogPage };