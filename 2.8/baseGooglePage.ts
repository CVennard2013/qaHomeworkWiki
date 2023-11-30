import {By} from "selenium-webdriver"
import {BasePage} from "./basePage"

export class Google extends BasePage {
    searchBar: By = By.name("q");
    results: By = By.id('rso')
    constructor() {
        super({url: "https://www.google.com"});
    }
    async search(searchThingy: string) {
        return this.setInput(this.searchBar, `${searchThingy}\n`);
    };
    async getResults() {
        return this.getText(this.results);
    };
}