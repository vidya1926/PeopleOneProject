import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
import { credentials } from "../constants/credentialData";
import { setTimeout } from "timers";

const signInLocator = "//span[text()='Sign In']";
const usernameSelector = "#username";
const passwordSelector = "#password";
const signInButtonLocator = "//button[text()='Sign In']";
const logoutButtonLocator = "//div[@class='logout']/a";
export class LearnerLogin extends PlaywrightWrapper {


    // static pageUrl = URLConstants.leanerURL;
    constructor(page: Page, context: BrowserContext) {
        super(page, context);

    }
    public async learnerLogin(role: string, url: string) {
        const { username, password } = credentials[role];

        const signIn = async () => {
            try {
                await this.waitForSelector(signInLocator);
                await this.wait('mediumWait');
                await this.click(signInLocator, "Sign In button", "Button");
            } catch (error) {
                console.error(`Error during sign-in process: ${error}`);
                throw error;
            }
        };

        try {
            switch (url) {
                case "Portal1": {
                    await this.loadApp(URLConstants.learnerportal);
                    break;
                }
                case "Portal2": {
                    await this.loadApp(URLConstants.learnerportal2);
                    break;
                }
                default:
                    await this.loadApp(URLConstants.leanerURL);
                    break;

            }
            await signIn();
            await this.type(usernameSelector, "Username", username);
            await this.type(passwordSelector, "Password", password);
            await this.wait('minWait');
            await this.click(signInButtonLocator, "Sign In button", "Button");
            await this.page.waitForLoadState('domcontentloaded');
            await this.waitForSelector(logoutButtonLocator);
            const logoutButton = this.page.locator(logoutButtonLocator);
            await expect(logoutButton).toBeVisible({ timeout: 20000 });
            console.log(`Login successful`);
            await this.wait('maxWait');
        } catch (error) {
            console.error(`Login attempt failed: ${error}`);
            throw error;
        }
    }


    public async basicLogin(username: string, url: string) {
        const signIn = async () => {
            try {
                await this.waitForSelector(signInLocator);
                await this.wait('mediumWait');
                await this.click(signInLocator, "Sign In button", "Button");
            } catch (error) {
                console.error(`Error during sign-in process: ${error}`);
                throw error;
            }
        };

        try {
            switch (url) {
                case "Portal1": {
                    await this.loadApp(URLConstants.learnerportal);
                    break;
                }
                case "Portal2": {
                    await this.loadApp(URLConstants.learnerportal2);
                    break;
                }
                default:
                    await this.loadApp(URLConstants.leanerURL);
                    break;
            }
            await signIn();
            await this.type(usernameSelector, "Username", username);
            await this.type(passwordSelector, "Password", "Welcome1@");
            await this.click(signInButtonLocator, "Sign In button", "Button");
            await this.page.waitForLoadState('domcontentloaded');
            await this.waitForSelector(logoutButtonLocator);
            const logoutButton = this.page.locator(logoutButtonLocator);
            await expect(logoutButton).toBeVisible({ timeout: 20000 });
            console.log(`Login successful`);
            console.log(await this.getTitle())
            await this.wait('maxWait');
        } catch (error) {
            console.error(`Login attempt failed: ${error}`);
            throw error;
        }
    }
}
