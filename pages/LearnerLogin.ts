import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
import { LearnerHomePage } from "./LearnerHomePage";

export class LearnerLogin extends PlaywrightWrapper {

    static pageUrl = URLConstants.leanerURL;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async learnerLogin(username: string, password: string) {
        const signInLocator = "//span[text()='Sign In']";
        const usernameSelector = "#username";
        const passwordSelector = "#password";
        const signInButtonLocator = "//button[text()='Sign In']";
        const logoutButtonLocator = "//div[@class='logout']/a";

        const signIn = async () => {
            try {
                await this.waitForSelector(signInLocator);
                await this.click(signInLocator, "Sign In button","Button");
            } catch (error) {
                console.error(`Error during sign-in process: ${error}`);
                throw error;
            }
        };

        try {
           await this.loadApp(LearnerHomePage.pageUrl);
            await signIn();
            await this.type(usernameSelector, "Username", username);
            await this.type(passwordSelector, "Password", password);

            await this.click(signInButtonLocator, "Sign In button","Button");
            await this.page.waitForLoadState('domcontentloaded');

            await this.waitForSelector(logoutButtonLocator);
            const logoutButton = this.page.locator(logoutButtonLocator);
            await expect(logoutButton).toBeVisible({ timeout: 20000 });
            console.log(`Login successful`);
        } catch (error) {
            console.error(`Login attempt failed: ${error}`);
            throw error;
        }
    }
}
