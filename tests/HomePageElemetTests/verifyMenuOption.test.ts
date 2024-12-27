import test from "@playwright/test";
import HomePage from "../Pages/Home.page";
import { NavBarOptions } from "../constants/constants";

test.describe('Home Page Elements on Automation Exercise Website', () => {
    let homePage: HomePage;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToHomePage();
    })

    test('Verify Menu Options', async () => {
        await test.step('Verify Home Menu Option', async () => {
            await homePage.verifyMenuOption(' ' + NavBarOptions.Home);
            await homePage.verifyMenuOption(' ' + NavBarOptions.APITesting);
            await homePage.verifyMenuOption(' ' + NavBarOptions.Cart);
            await homePage.verifyMenuOption(' ' + NavBarOptions.ContactUs);
            await homePage.verifyMenuOption(' ' + NavBarOptions.Products);
            await homePage.verifyMenuOption(' ' + NavBarOptions.SignupOrLogin);
            await homePage.verifyMenuOption(' ' + NavBarOptions.TestCases);
            await homePage.verifyMenuOption(' ' + NavBarOptions.VideoTutorials);
        })
    })

    test('verify number of slides in home page carousel', async () => {
        await test.step('Verify number of slides in carousel', async () => {
            await homePage.verifyNumberOfSlidesInCarousel(3);
        })
    })

    test('verify number of categories in categories section on home page.', async () => {
        await test.step('Verify number of categories in categories section', async () => {
            await homePage.verifyNumberOfCategoriesInCategoriesSection(3);
        })
    })

    test('verify number of Brand name in Brand section on home page.', async () => {
        await test.step('Verify number of Brand name in Brand section', async () => {
            await homePage.verifyNumberOfBrandsInBrandsSection(8);
        })
    })

    test('verify number of products in featured section on home page.', async () => {
        await test.step('Verify number of products in featured section', async () => {
            await homePage.verifyMoreThanOneProductsInFeaturedSection();
        })
    })

    test('verify submit button next to subscribe email input field.', async () => {
        await test.step('Verify submit button next to subscribe email input field', async () => {
            await homePage.verifySubmitButtonNextToSubscribeEmailInputField();
        })
    })
})