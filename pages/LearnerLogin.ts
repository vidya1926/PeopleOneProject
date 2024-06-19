import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
export class LearnerLogin extends PlaywrightWrapper {

    static pageUrl = URLConstants.leanerURL;
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        //this.loadApp(LearnerLogin.pageUrl);
    }

    public async learnerLogin(username: string, password: string) {
        async function signIn(locator: string) {
            try {
                await this.validateElementVisibility(locator, "Sign In");
                await this.mouseHover(locator, "Sign In");
                await this.click(locator, "Sign In", "Button");
            } catch (error) {
                console.error(`Error during sign-in process: ${error}`);
            }
        }
        try {
            await signIn.call(this, "//span[text()='Sign In']");
        } catch (error) {
            console.error(`Error calling signIn function: ${error}`);
        }
        await this.type("#username", "Username", username);
        await this.type("#password", "password", password);
        await this.click("//button[text()='Sign In']", "Sign In", "Button")
        await this.page.waitForLoadState('domcontentloaded')
        const logoutButton = this.page.locator("//div[@class='logout']/a")
        await expect(logoutButton).toBeVisible({ timeout: 20000 })
        await this.storeState("./logins/expertuslearnerLog.json");

    }

}