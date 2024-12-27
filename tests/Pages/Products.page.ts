import { expect, Page } from "@playwright/test";
import BasePage from "./Base.page";
import { selectors } from "../selectors/selectors";
import { Constants, NavBarOptions } from "../constants/constants";

export default class Products extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async verifyProductDetails(productName: string) {
        const product = this.page.locator(selectors.withText(productName) + selectors.ancestorWithClass(selectors.homePageProducts.substring(1)));
        await product.scrollIntoViewIfNeeded();
        await expect(product.locator(selectors.withText(Constants.AddToCart)).first()).toBeVisible();
        await expect(product.locator(selectors.parent()).locator(selectors.withText(Constants.ViewProduct))).toBeVisible();    
    }

    public async verifyBannerOnHoverOfProduct(productName: string, productPrice: string) {
        const product = this.page.locator(selectors.withText(productName) + selectors.ancestorWithClass(selectors.homePageProducts.substring(1)));
        await product.hover();
        await expect(product.locator(selectors.productOverlayOnHover)).toBeVisible();
        await expect(product.locator(selectors.productOverlayOnHover).locator(selectors.withText(productPrice))).toBeVisible();
        await expect(product.locator(selectors.productOverlayOnHover).locator(selectors.withText(Constants.AddToCart))).toBeVisible();
    }

    public async clickOnAddToCart(productName: string) {
        const product = this.page.locator(selectors.withText(productName) + selectors.ancestorWithClass(selectors.homePageProducts.substring(1)));
        await product.scrollIntoViewIfNeeded();
        await product.hover();
        await product.locator(selectors.productOverlayOnHover).locator(selectors.withText(Constants.AddToCart)).click();
        await expect(this.page.locator(selectors.withText(Constants.AddedToCartSuccessMessage))).toBeVisible();
   }

   public async clickOnContinueShopping() {
       await this.page.locator(selectors.continueShopping).click();
       expect(await this.page.locator(selectors.homePageProducts).count()).toBeGreaterThan(0);
   }

   public async verifyProductInCart(productName: string) {
    await this.page.locator(selectors.withText(' ' + NavBarOptions.Cart)).hover();
    await this.page.locator(selectors.withText(' ' + NavBarOptions.Cart)).click();
    await expect(this.page.locator(selectors.productsDescriptionInCart).locator(selectors.withText(productName))).toBeVisible();
   }

   public async closeAdsPopup() {
    const shadowRoot = await this.page.locator(selectors.adsPopup);
    const shadowRootHost = await shadowRoot.evaluateHandle((e) => e.shadowRoot);
    const addClosureButton = await shadowRootHost.evaluate(root => root?.querySelector('g'));
    await addClosureButton?.ariaHidden;
   }
}