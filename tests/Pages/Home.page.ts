import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./Base.page";
import { selectors } from "../selectors/selectors";
import { Locator_id} from "../constants/constants";
import products from "./Products.page";
import Products from "./Products.page";

export default class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async verifyMenuOption(option: string) {
        await expect(this.page.locator(selectors.navbarElements).locator(selectors.withText(option))).toBeVisible();
    }

    public async verifyNumberOfSlidesInCarousel(expectedNumberOfSlides: number) {
        expect(await this.page.locator(selectors.homePageCarousel).count()).toBe(expectedNumberOfSlides);
    }

    public async verifyNumberOfCategoriesInCategoriesSection(expectedNumberOfCategories: number) {
        expect(await this.page.locator(selectors.elementWithId(Locator_id.Accordian) + ' span').count()).toBe(expectedNumberOfCategories);
    }

    public async verifyNumberOfBrandsInBrandsSection(expectedNumberOfBrands: number) {
        await expect(this.page.locator(selectors.homePageBrandNames)).toHaveCount(expectedNumberOfBrands);
    }

    public async verifyMoreThanOneProductsInFeaturedSection() {
        expect(await this.page.locator(selectors.homePageProducts).locator('div').count()).toBeGreaterThan(1);
    }

    public async verifySubmitButtonNextToSubscribeEmailInputField() {
        const emailInputField = this.page.locator(selectors.elementWithId(Locator_id.SusbscribeEmail));
        await emailInputField.scrollIntoViewIfNeeded();
        await expect(emailInputField).toBeVisible();
        await expect(this.page.locator(selectors.elementWithId(Locator_id.SusbscribeEmail + '+button'))).toHaveAttribute('type', 'submit');
    }

    public async goToProductsPageFromCategory(productCategory: string, productSubCategories: string): Promise<Products> {
        await this.page.locator(selectors.withHref(productCategory)).click();
        await this.page.locator(selectors.withHref(productSubCategories)).click();
        return new Products(this.page);
    }
}