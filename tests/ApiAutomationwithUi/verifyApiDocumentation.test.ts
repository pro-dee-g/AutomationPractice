import { expect, Page } from "@playwright/test";
import { test } from "../fixture/ApiFixture";
import { selectors } from "../selectors/selectors";
import { NavBarOptions } from "../constants/constants";

test.describe('Verify API Documentation', () => {
    let apiDocumentationPage: ApiDocumentationPage;
    const testData = [0,1,2,3,4,5];
    test.beforeEach(async ({ page }) => {
        apiDocumentationPage = new ApiDocumentationPage(page);
    });

    testData.forEach((data) => {
        test(`Verify API documentation ${data}`, async ({ request }) => {
            await apiDocumentationPage.goToApiDocumentationPage();
            const {url, method, status} = await apiDocumentationPage.getNthTestDetails(data);
            console.log(url, method, status);
            if(method == "GET") {
                const response = await request.fetch(url, {method: method, data: JSON.stringify({})});
                expect(response.status()).toBe(status)
            } else {
                const response = await request.fetch(url, {method: method});
                expect(response.status()).toBe(status)
            }
            
        });
    });

})

class ApiDocumentationPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    public async goToApiDocumentationPage() {
        await this.page.goto('');
        await this.page.locator(selectors.withText(' ' + (NavBarOptions.APITesting))).click();
    }

    public async getNthTestDetails(nth: number): Promise<TestDetails> {
        await this.page.locator(selectors.apiTestsHeading).nth(nth).click();
        const testDetailsContainer = this.page.locator(selectors.testDetailsContainer).nth(nth);
        const url = (await testDetailsContainer.locator(selectors.testDetailsItems).nth(0).textContent())?.substring(9);
        const method = (await testDetailsContainer.locator(selectors.testDetailsItems).nth(1).textContent())?.substring(16);
        const status = (Number)((await testDetailsContainer.locator(selectors.testDetailsItems).nth(2).textContent())?.substring(15));
        this.page.locator(selectors.apiTestsHeading).nth(nth).click();
        return url && method && status ? {url, method, status} : {url: '', method: '', status: 0};
    }
}

type TestDetails = {
    url: string;
    method: string;
    status: number;
}