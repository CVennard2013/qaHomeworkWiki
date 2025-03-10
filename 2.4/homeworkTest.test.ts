import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

describe("Employee Manager 1.2", () => {

    beforeEach(async () => {
        await driver.get(
        "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
        );
    });
    afterAll(async () => {
        await driver.quit();
    });
    describe("handles unsaved, canceled, and saved changes correctly", () => {
        test("An unsaved change doesn't persist", async () => {
        /*
        This test follows these steps:
        1. Open Bernice Ortiz
        2. Edit the name input
        3. Open Phillip Weaver
        4. Open Bernice Ortiz
        5. Verify the name field is the original name
        */
        await driver.findElement().click();
        await driver.wait(
            until.elementIsVisible(await driver.findElement())
        );
        await driver.findElement().clear();
        await driver.findElement().sendKeys("Test Name");
        await driver.findElement().click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(),
            "Phillip"
            )
        );
        await driver.findElement().click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(),
            "Bernice"
            )
        );
        expect(
            await (await driver.findElement()).getAttribute("")
        ).toBe("");
        });
        // This tests to see if unsaved changes do not take place

        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys("Test Name");
            await driver.findElement().click();
            expect(
                await (await driver.findElement()).getAttribute("")
            ).toBe("");
        });
        // This test verifies that if you cancel, the change doesn't take place and origional name is still there

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys("Test Name");
            await driver.findElement().click();
            await driver.findElement().click();
            await driver.wait(
                until.elementTextContains(
                await driver.findElement(),
                "Phillip"
                )
            );
            await driver.findElement().click();
            expect(
                await (await driver.findElement()).getAttribute("value")
            ).toBe("Bernice Ortiz");
    });
});
// This test verifies that an edit actually takes place when intended

    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement().click();
            await driver.wait(until.elementLocated());
            expect(await (await driver.findElement()).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
        });
//This test verifies that an error pops up if you have 0 characters for an input

        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement().click();
            await driver.wait(until.elementLocated());
            expect(await (await driver.findElement()).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            await driver.findElement().sendKeys(Key.SPACE);
            await driver.findElement().click();
            driver.wait(() => true, 500);
            expect(await driver.findElements()).toHaveLength(0);
        });
    });
    //This test verifies that if you get an error, the error doesn't remain if issue is fixed.
});