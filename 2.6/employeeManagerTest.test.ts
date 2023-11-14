import {Builder,By, Capabilities, until, WebDriver, } from "selenium-webdriver";
  const chromedriver = require("chromedriver");

  const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  class employeePage {
      driver: WebDriver;
      url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
        //FILL OUT LOCATORS CONSTRUCTOR AND METHODS IN ORDER TO PASS THE TEST
        header: By=By.className('titleText');
        addEmployee: By=By.name('addEmployee');
        newEmployee: By=By.xpath('(//li[@class="listText"])[11]');
        nameInput: By=By.name('nameEntry');
        phoneInput: By=By.name('phoneEntry');
        titleInput: By=By.name('titleEntry');

        constructor(driver: WebDriver){
            this.driver=driver;
        }
        async navigate() {
            await this.driver.get(this.url);
            await this.driver.wait(until.elementLocated(this.header));  
  };
};
  const emPage=new employeePage(driver);

  describe("Employee Manger Test", () => {
      beforeEach(async () => {
          await emPage.navigate();
      });
      afterAll(async () => {
          await emPage.driver.quit();
      });
      test("adding an employee", async () => {
          await driver.wait(until.elementLocated(emPage.header));
          await driver.findElement(emPage.addEmployee).click();
          await driver.findElement(emPage.newEmployee).click();
          await driver.findElement(emPage.nameInput).click();
          await driver.findElement(emPage.nameInput).clear();
          await driver.findElement(emPage.nameInput).sendKeys("Test Name");
          await driver.findElement(emPage.phoneInput).click();
          await driver.findElement(emPage.phoneInput).clear();
          await driver.findElement(emPage.phoneInput).sendKeys(8145693247);
          await driver.findElement(emPage.titleInput).click();
          await driver.findElement(emPage.titleInput).clear();
          await driver.findElement(emPage.titleInput).sendKeys("Test Job");
  });
  });
  /* this is a commment */