import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";

export class AdminLogin extends PlaywrightWrapper{

static pageUrl = URLConstants.adminURL;

constructor(page: Page,context:BrowserContext) {
    super(page,context);
   // this.loadApp(adminLogin.pageUrl);
}

public async adminLogin(username:string,password:string){
    await this.type("#username","Username",username);
    await this.type("#password","password",password);
    await this.click("//button[contains(text(),'SIGN')]","Sign In","Button");
    await this.page.waitForTimeout(10000);
    const logoutButton =this.page.locator("//div[@class='logout']");
    await expect(logoutButton).toBeVisible({timeout:10000});
    await this.storeState("./logins/expertusAdminLog.json");
}

}