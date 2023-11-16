import {By, until, WebDriver} from 'selenium-webdriver';

export class SpecPage {
    driver: WebDriver;
    url: string='https:www.google.com';

    searchBar: By=By.name('q')
    results: By=By.id('rcnt')
    searchBtn: By=By.name('btnK')

    constructor(driver: WebDriver){
        this.driver=driver
    }

    async navigate(){
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.searchBar))
    }
    async sendKeys(elementBy: By, keys: any){
        await this.driver.wait(until.elementLocated(elementBy)).clear()
        await this.driver.findElement(elementBy).sendKeys(keys)
    }
    async getText(elementBy: By){
        await this.driver.wait(until.elementLocated(elementBy))
        return this.driver.findElement(elementBy).getText()
    }
    async doSearch(text: string){
        return this.sendKeys(this.searchBar, `${text}\n`)
        await this.driver.findElement(this.searchBtn).click()
    }
    async getResults(){
        return this.getText(this.results)
    }
    }