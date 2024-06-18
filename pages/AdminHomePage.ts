import { Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/credentialConstants";
import { AdminLogin } from "./AdminLogin";

export class AdminHomePage extends PlaywrightWrapper {
    static pageUrl = URLConstants.adminURL;

    public selectors = {
        signOutLink: "//div[@class='logout']/a",
        dragableMenu:(menu:string)=>`//div[text()='${menu}']/following::div[text()="Create"][1]`,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        userMenu: "//a[text()='User']",
        metadataLibraryMenu: "//span[text()='metadata library']",
        metaPeopleLink: "//a[text()='People']",
        metaLearningLink: "//a[text()='Learning']",
        adminGroupLink:"//a[text()='Admin Group']",
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.common(page, context).catch(err => console.error("Error in common setup:", err));
    }

    private async common(page: Page, context: BrowserContext,login?: string) {
        await this.loadApp(AdminHomePage.pageUrl);
        let pageTitle = await this.getTitle();
        console.log("Page Title:", pageTitle);
        
        if (pageTitle.startsWith("signin")) {
            const adLogin = new AdminLogin(page, context);
            await adLogin.adminLogin(credentialConstants.USERNAME, credentialConstants.PASSWORD);
            // if(login=="Admin"){
            // await adLogin.adminLogin(credentialConstants.USERNAME, credentialConstants.PASSWORD);
            // // Example: await adLogin.storeState("../logins/expertusAdminLog.json");
            // }else if(login =="customerAdmin"){
            // await adLogin.adminLogin(credentialConstants.managerUSERNAME, credentialConstants.PASSWORD);
            // }
        }
    }

    public async isSignOut() {
        await this.validateElementVisibility(this.selectors.signOutLink, "Sign Out");
        await this.page.waitForLoadState('load');
    }

    public async clickMenu(menu: string) {
        await this.page.waitForLoadState('load');
        await this.spinnerDisappear();
        await this.mouseHover("//div[@class='item-content processed']", "Menu");
        await this.click(this.selectors.dragableMenu(menu), "Create", "Button");
    }
    
    public async menuButton() {
        await this.page.waitForLoadState('load');
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.menu, "Menu");
        await this.click(this.selectors.menu, "Menu", "Button");
    }

    public async people() {
        await this.validateElementVisibility(this.selectors.peopleMenu, "People");
        await this.click(this.selectors.peopleMenu, "People", "Button");
    }
    
    public async user() {
        await this.click(this.selectors.userMenu, "USER", "Button");
    }

    public async metadataLibrary() {
        await this.validateElementVisibility(this.selectors.metadataLibraryMenu, "Metadata Library");
        await this.click(this.selectors.metadataLibraryMenu, "Metadata Library", "Button");
    }

    public async meta_People() {
        await this.validateElementVisibility(this.selectors.metaPeopleLink, "People");
        await this.mouseHover(this.selectors.metaPeopleLink, "People");
        await this.click(this.selectors.metaPeopleLink, "People", "Button");
    }

    public async meta_learning() {
        await this.validateElementVisibility(this.selectors.metaLearningLink, "Learning");
        await this.mouseHover(this.selectors.metaLearningLink, "Learning");
        await this.click(this.selectors.metaLearningLink, "Learning", "Button");
        await this.spinnerDisappear();
    }

    async enter(name: string, data: string) {
        await this.type(`//input[@id="${name}"]`, name, data);
    }

    public async adminGroup(){
        await this.click(this.selectors.adminGroupLink,"AdminGroup","Link");
    } 
}
