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
        learningMenu:"//span[text()='Learning']",
        courseLink:"//a[text()='Course']",
        createCourseBtn:"//button[text()='CREATE COURSE']",
        userMenu: "//a[text()='User']",
        metadataLibraryMenu: "//span[text()='metadata library']",
        metaPeopleLink: "//a[text()='People']",
        metaLearningLink: "//a[text()='Learning']",
        adminGroupLink:"//a[text()='Admin Group']",
        locationLink:"//a[text()='Location']",
        commerceMenu:`//span[text()='Commerce']`,
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.common(page, context).catch(err => console.error("Error in common setup:", err));
        this. setupPageListeners();
    }

    private async common(page: Page, context: BrowserContext) {
      //  try {
            console.log("Loading admin home page...");
            const adLogin = new AdminLogin(page, context);
                await adLogin.adminLogin(credentialConstants.LEARNERADMIN, credentialConstants.PASSWORD);
            //await this.loadApp(AdminHomePage.pageUrl);
            await this.wait('mediumWait');
            let pageTitle = await this.getTitle();
            console.log("Page Title:", pageTitle);
            if (pageTitle.toLowerCase().includes("signin")) {
                console.log("Sign-in page detected. Performing login...");
                const adLogin = new AdminLogin(page, context);
                await adLogin.adminLogin(credentialConstants.USERNAME, credentialConstants.PASSWORD);
                await this.wait('mediumWait'); 
                pageTitle = await this.getTitle(); 
                console.log("Page Title after login:", pageTitle);
            }
        } catch (err) {
            console.error("Error during common setup:", err);
            throw err;
         
    }
    private  setupPageListeners() {
        this.page.on('load', async () => {
            try {
                console.log("Page loaded. Executing common method...");
                await this.executeAfterLoad(); 
            } catch (err) {
                console.error("Error executing common method after load:", err);
                throw err;
            }
        });
    }
    private async executeAfterLoad() {
        try {
            console.log("Executing common method after page load...");
            await this.isSignOut(); // Example: Check if sign-out link is visible after page load
        } catch (err) {
            console.error("Error executing common method after load:", err);
            throw err;
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

    public async clickLearningMenu() {
        await this.validateElementVisibility(this.selectors.learningMenu, "Learning");
        await this.click(this.selectors.learningMenu, "Learning", "Button");
    }
    public async clickCourseLink() {
        await this.validateElementVisibility(this.selectors.courseLink, "Course");
        await this.click(this.selectors.courseLink, "Course", "Button");
    }
    public async clickCreateCourse() {
        await this.validateElementVisibility(this.selectors.createCourseBtn, "Course");
        await this.click(this.selectors.createCourseBtn, "Course", "Button");
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

    public async locationLink(){
        await this.click(this.selectors.locationLink,"Location","Link");
    }

    async clickCommerceMenu(){
        this.click(this.selectors.commerceMenu,"Commerce Menu","Button")
    }

}

