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

        // Helper function for signing in
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

        // Main sign-in process with retry logic
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                // Call the sign-in process
                await signIn();

                // Type in username and password
                await this.type("#username", "Username", username);
                await this.type("#password", "Password", password);

                // Click the sign-in button
                await this.click("//button[text()='Sign In']", "Sign In", "Button");

                // Wait for the page to load
                await this.page.waitForLoadState('domcontentloaded');

                // Verify logout button visibility
                const logoutButton = this.page.locator("//div[@class='logout']/a");
                await expect(logoutButton).toBeVisible({ timeout: 20000 });

                // If the process is successful, break the loop
                break;
            } catch (error) {
                console.error(`Attempt ${attempt} failed: ${error}`);
                if (attempt === retries) {
                    throw new Error(`All ${retries} attempts failed`);
                }
                // Optional: Add delay before retrying
                await this.page.waitForTimeout(1000); // wait for 1 second before retrying
            }
        }

        
    }
}
