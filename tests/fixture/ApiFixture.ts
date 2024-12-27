import {test as base, APIRequestContext} from "@playwright/test";

type apiFixture = {
    request: APIRequestContext;
}

export const test = base.extend<apiFixture>({
    request: async ({playwright}, use) => {
        const context = await playwright.request.newContext();
        await use(context);
        await context.dispose();
    }
})