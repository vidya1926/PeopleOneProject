
import { Page, test, expect, BrowserContext } from "@playwright/test";
import { promises } from "dns";
import * as path from 'path';


declare module '@playwright/test' {
    interface Page {
        delayedFill: (selector: string, value: string) => Promise<void>;
        clickAndDelay: (selector: string) => Promise<void>;
    }

}


export abstract class PlaywrightWrapper {

    readonly page: Page;
    readonly context: BrowserContext


    index: number
    constructor(page: Page, context: BrowserContext,) {
        this.page = page;
        this.context = context;


    }
    /*
    This function types on the given element textbox after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async type(locator: string,
        name: string,
        data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);

        });
    }
    /*
    This function types on the given element textbox and press <ENTER> after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async typeAndEnter(locator: string,
        name: string,
        data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press("Enter");

        });
    }
    /*
    This function clicks on the given element textbox
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    */
    async click(locator: string,
        name: string,
        type: string
    ) {
        await test.step(`The ${type} ${name} clicked`, async () => {
           
            await this.page.waitForSelector(locator, { state: 'visible' });
            await this.page.locator(locator).click({ force: true });
        });
    }
    async storeState(path: string) {
        await this.page.context().storageState({ path: path })
    }

    async keyboardType(locator: string, data: string) {
        await test.step(`Typing the ${data}`, async () => {
            await this.page.focus(locator);
            await this.page.keyboard.type(data,{ delay: 300 });
        })
    }
    async loadApp(url: string) {
        try {
            await test.step(`The URL ${url} loaded`, async () => {
                await this.page.goto(url, { timeout: 60000 }); // Increased timeout
            });
        } catch (error) {
            console.error('Error loading the page:', error);
        }
    }
    async getInnerText(locator: string): Promise<string> {
        return await this.page.locator(locator).innerText();
    }
    async getText(locator: string): Promise<string> {
        return await this.page.locator(locator).inputValue();

    }
    async getTitle(): Promise<string> {
        await this.page.waitForTimeout(10000);
        return await this.page.title();
    }

    async waitForSelector(locator: string) {
        await this.page.waitForSelector('input')
    }
    async fetchattribute(locator:string,attName:string){
        await this.page.locator(locator).getAttribute(attName)
    }

    async multipleWindowsCount(): Promise<number> {
        const windowslength = this.page.context().pages().length;
        return windowslength;
    }

    async fillwithDelay(locator: string, inputValues: string) {
        await this.page.delayedFill(locator, inputValues)
    }

    async clickwithDelay(locator: string) {
        await this.page.clickAndDelay(locator);
    }

    async switchToWindow(windowTitle :any ) {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page')
        ]);
        const pages = newPage.context().pages();
        for (const page of pages) {
            if (await page.title() === windowTitle) {
                await page.bringToFront();
                return page;
            }
        }
        console.log(`No page found with title: ${windowTitle}`);
        return null;
    }

    async switchToWindowWithTitle(windowTitle: string) {
        const [multiPage] = await Promise.all([
            this.context.waitForEvent('page'),
        ]);
        const pages = multiPage.context().pages();

        console.log(`Number of pages opened: ${pages.length}`);

        for (const page of pages) {
            const url = page.url();
            console.log(`URL of the page is : ${url}`);
            const title = await page.title();
            console.log(`Title of the page: ${title}`);
            if (title === windowTitle) {
                console.log(`Switching to the page with title: ${windowTitle}`);
                await page.bringToFront();
                return page;
            }
        }
        console.log(`No page found with title: ${windowTitle}`);
        return null;
    }

    async acceptAlert(Data: string) {
        this.page.on("dialog", async (dialog) => {
            dialog.message()
            await dialog.accept(Data);
            console.log('Dialog Message:', dialog.message());
        });
    }
    //i:number;
    async clickinFrame(frameLocator: string, locator: string, name: string, type: string, index: number) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            const frameCount = 1;
            await this.page.locator(frameLocator).count();
            if (frameCount > 0) {
                await this.page.frameLocator(frameLocator).locator(locator).nth(index).click({ force: true });
            } else {
                await this.page.locator(locator).click({ force: true });
            }
        })
    }
    async typeinFrame(flocator: string, locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            const frameCount = 1;
            if (frameCount > 0) {
                await this.page.frameLocator(flocator).locator(locator).clear();
                await this.page.frameLocator(flocator).locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            } else {
                await this.page.locator(locator).clear();
                await this.page.locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            }
        });
    }

    async mouseHoverandClick(hoverLocator: string, clickLocator: string, Menu: string, name: string) {
        await test.step(`The ${Menu} ${name} clicked`, async () => {
            await this.page.hover(hoverLocator);
            await this.page.click(clickLocator);

        })
    }

    async mouseHover(hoverLocator: string, Menu: string) {
        await test.step(`The pointer hovers over the ${Menu} element.  `, async () => {
            await this.page.hover(hoverLocator);
        })
    }

    async draganddrop(sourceLocator: string, targetLocator: string, sourceElement: string, targetElement: string) {
        await test.step(`The ${sourceElement} dragged  to ${targetElement} Succesfully`, async () => {
            const sourceElement = this.page.locator(sourceLocator)
            const targetElement = this.page.locator(targetLocator)
            await sourceElement.dragTo(targetElement)
        })
    }

    async keyboardAction(locator: string, keyAction: string, Menu: string, name: string) {
        await test.step(`The ${Menu} ${name} Entered`, async () => {
            await this.page.focus(locator)
            await this.page.keyboard.press(keyAction)
        })
    }

    async doubleClick(locator: string, name: string) {
        await test.step(`The ${name} clicked`, async () => {
            await this.page.locator(locator).click({ force: true })
            await this.page.locator(locator).click({ force: true })
        })
    }

    async verification(locator: string, expectedTextSubstring: string) {
        const element = this.page.locator(locator).nth(0);
        const text = await element.innerText();
        console.log(text);
        const lowerCaseText = text.toLowerCase();
        const lowerCaseExpected = expectedTextSubstring.toLowerCase();
        expect(lowerCaseText).toContain(lowerCaseExpected);
        console.log(`Field value verified successfully`);
    }


    async waitForElementHidden(locator: string, type: string) {
        try {
            await this.wait('minWait')
            await this.page.waitForSelector(locator, { state: 'hidden', timeout: 20000 });
            console.log(`Element with XPath "${type}" is hidden as expected.`);
        } catch (error) {
            console.error(`Element with XPath "${type}" is still visible.`);
        }
    }


    async validateElementVisibility(locator: any, elementName: string) {
        try {
            const element = this.page.locator(locator);
            await this.page.waitForSelector(locator, { state: 'visible', timeout: 30000, strict: true });
            if (await element.isVisible({ timeout: 20000 })) {
                console.log(`${elementName} is visible as expected.`);
            } else {
                console.error(`${elementName} is not visible.`);
            }
        } catch (error) {
            console.error(`Error validating visibility of ${elementName}: ${error}`);
        }
    }


    async uploadMultipleContent(fileName1: string, fileName2: string, locator: any) {
        const inputElementHandle = this.page.locator(locator)
        if (inputElementHandle) {
            await inputElementHandle.setInputFiles([path.resolve(__dirname, fileName1),
            path.resolve(__dirname, fileName2)])
        } else {
            console.error('Input element not found');
        }
    }


    async uploadFile(locator: string, Path: string,) {
        const filePath = path.resolve(__dirname, Path);
        const inputElementHandle = this.page.locator(locator);
        if (inputElementHandle) {
            await inputElementHandle.setInputFiles(filePath);
        } else {
            console.error('Input element not found');
        }
    }

    async wait(waitType: 'minWait' | 'mediumWait' | 'maxWait') {
        try {
            switch (waitType) {
                case 'minWait':
                    await this.page.waitForTimeout(2000);
                    break;
                case 'mediumWait':
                    await this.page.waitForTimeout(5000);
                    break;
                case 'maxWait':
                    await this.page.waitForTimeout(10000);
                    break;
                default:
                    console.log("Invalid wait type provided.");
                    throw new Error(`Invalid wait type: ${waitType}`);
            }
        } catch (error) {
            console.error("Error during wait:", error);
        }
    }


    async spinnerDisappear() {
        await this.wait('mediumWait');
        try {
            const spinner = this.page.locator("[class='p-3'] svg");
            await expect.soft(spinner).toHaveCount(0);
            console.log("Expected element is disabled");
        } catch (error) {
            console.log("Spinner is still present or assertion failed. Skipping further execution.");
            return;
        }

    }

    async typeText(locator: string, name: string, data: Promise<string | null>) {
        const resolvedData = await data;
        await test.step(`Textbox ${name} filled with data: ${resolvedData}`, async () => {
            if (resolvedData !== null) {
                await this.page.locator(locator).fill(resolvedData);
            } else {
                throw new Error(`Cannot fill textbox ${name} with null data`);
            }
        });
    }

    async clickCheckbox(locator: string, name: string) {
        await test.step(`Checkbox ${name} is selected`, async () => {
            await this.page.focus(locator)
            await this.page.check(locator, { force: true });
        })
    }

   



}
