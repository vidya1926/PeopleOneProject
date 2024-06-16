import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";
export class LearnerLogin extends PlaywrightWrapper{

static pageUrl = URLConstants.leanerURL;
constructor(page: Page,context:BrowserContext) {
    super(page,context);
    this.loadApp(LearnerLogin.pageUrl);
}

public async learnerLogin(username:string,password:string){
    await this.click("//a[@id='signin']","Sign In","Button")
    await this.type("#username","Username",username);
    await this.type("#password","password",password);
    await this.click("//button[text()='Sign In']","Sign In","Button")
    await this.page.waitForLoadState('domcontentloaded')
    const logoutButton =this.page.locator("//a[@title='Sign Out']")
    await expect(logoutButton ).toBeVisible({timeout:20000})
    await this.storeState("./logins/expertuslearnerLog.json");
   
}

}