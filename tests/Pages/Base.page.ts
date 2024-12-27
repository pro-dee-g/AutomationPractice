import { Page } from "@playwright/test";
import {  selectors } from "../selectors/selectors";
import { Locator_id } from "../constants/constants";

export default class BasePage{
    protected page: Page;
    constructor(page: Page){
        this.page = page;
    }

    async goToHomePage() {
        await this.page.goto('');
        await this.page.locator(selectors.elementWithId(Locator_id.Slider)).waitFor({state: 'visible'});
    }
}