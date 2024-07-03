import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";

export class LearnerLogin extends PlaywrightWrapper {

    static pageUrl = URLConstants.leanerURL;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async learnerLogin(username: string, password: string, retries = 2) {
        const signInLocator = "//span[text()='Sign In']";
        const usernameSelector = "#username";
        const passwordSelector = "#password";
        const signInButtonLocator = "//button[text()='Sign In']";
        const logoutButtonLocator = "//div[@class='logout']/a";

        const signIn = async () => {
            try {
                await this.validateElementVisibility(signInLocator, "Sign In");
                await this.mouseHover(signInLocator, "Sign In");
                await this.click(signInLocator, "Sign In", "Button");
            } catch (error) {
                console.error(`Error during sign-in process: ${error}`);
                throw error;
            }
        };

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`Login attempt ${attempt} of ${retries}`);
                await signIn();
                await this.type(usernameSelector, "Username", username);
                await this.type(passwordSelector, "Password", password);

                await this.click(signInButtonLocator, "Sign In", "Button");
                await this.page.waitForLoadState('domcontentloaded');

                const logoutButton = this.page.locator(logoutButtonLocator);
                await expect(logoutButton).toBeVisible({ timeout: 20000 });
                console.log(`Login attempt ${attempt} successful`);
                break;
            } catch (error) {
                console.error(`Attempt ${attempt} failed: ${error}`);
                if (attempt === retries) {
                    throw new Error(`All ${retries} attempts failed`);
                }
                await this.page.waitForTimeout(1000); 
            }
        }
    }
}
