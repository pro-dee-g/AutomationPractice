import test from "@playwright/test";
import HomePage from "../Pages/Home.page";
import Products from "../Pages/Products.page";
import { Constants, WithHref } from "../constants/constants";

test.describe('Cart Work Flow on Automation Exercise Website', () => {
    let homePage: HomePage;
    let productsPage: Products;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToHomePage();
    })

    test('Verify Cart Work Flow', async ({ page }) => {
        await test.step('Go to products page from category', async () => {
            productsPage = await homePage.goToProductsPageFromCategory(WithHref.Men, WithHref.TShirts);
        });

        await test.step('Verify product details for Pure Cotton Neon Green Tshirt', async () => {
            await productsPage.verifyProductDetails(Constants.PureCottonNeonGreenTShirt);
        })

        await test.step('Verify banner on the hover of product', async () => {
            await productsPage.verifyBannerOnHoverOfProduct(Constants.PureCottonNeonGreenTShirt, Constants.NeonGreenTshirtPrice);
        })

        await test.step('Click on Add to Cart button', async () => {
            await productsPage.clickOnAddToCart(Constants.PureCottonNeonGreenTShirt);
        })

        await test.step('Click on Continue Shopping', async () => {
            await productsPage.clickOnContinueShopping();
        })

        await test.step('Click on Add to Cart button', async () => {
            await productsPage.clickOnAddToCart(Constants.PremiumPoloTShirts);
        })

        await test.step('Click on Continue Shopping', async () => {
            await productsPage.clickOnContinueShopping();
        })

        await test.step('Verify product in cart', async () => {
            await productsPage.verifyProductInCart(Constants.PureCottonNeonGreenTShirt);
            await productsPage.verifyProductInCart(Constants.PremiumPoloTShirts);
        })
    })
})