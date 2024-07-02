import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
import { credentialConstants } from "../constants/credentialConstants";

export class AdminLogin extends PlaywrightWrapper {

    static pageUrl = URLConstants.adminURL;
    role:string

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        // Uncomment the line below if you want to navigate to the page URL during instantiation
        // this.loadApp(AdminLogin.pageUrl);
    }
    public async adminLogin(username: string, password: string) {           
         console.log("Starting admin login process...");
        // Ensure that the login page is loaded
        await this.page.goto(AdminLogin.pageUrl);
        // Clear existing value and type username
        await this.clearAndType("#username", "Username",username);
        // Clear existing value and type password
        await this.clearAndType("#password", "Password", password);

        console.log("Clicking Sign In button...");
        // Use waitForNavigation to handle page transitions
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }), // Wait for the navigation to complete
            this.page.locator("//button[contains(text(),'SIGN')]").click() // Click the sign-in button
        ]);

        console.log("Waiting for logout button to be visible...");
        const logoutButton = this.page.locator("//div[@class='logout']");
        await expect(logoutButton).toBeVisible({ timeout: 10000 });

        console.log("Storing state...");
        await this.storeState("./logins/expertusAdminLog.json");
    }

    private async clearAndType(selector: string, fieldName: string, value: string) {
        console.log(`Clearing and typing into ${fieldName}...`);
        const element = this.page.locator(selector);

        // Clear any existing value
        await element.evaluate((node: HTMLInputElement) => { node.value = ''; });

        await element.type(value);
        console.log(`${fieldName} set to ${value}`);
    }
}
