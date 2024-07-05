import { Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/credentialConstants";
import { AdminLogin } from "./AdminLogin";

export class AdminHomePage extends AdminLogin {
    static pageUrl = URLConstants.adminURL;

       public selectors = {
        signOutLink: "//div[@class='logout']/a",
        dragableMenu: (menu: string) => `//div[text()='${menu}']/following::div[text()="Create"][1]`,
        menu:"//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        learningMenu: "//span[text()='Learning']",
        courseLink: "//a[text()='Course']",
        createCourseBtn: "//button[text()='CREATE COURSE']",
        userMenu: "//a[text()='User']",
        metadataLibraryMenu: "//span[text()='metadata library']",
        metaPeopleLink: "//a[text()='People']",
        metaLearningLink: "//a[text()='Learning']",
        adminGroupLink: "//a[text()='Admin Group']",
        locationLink: "//a[text()='Location']",
        commerceMenu: `//span[text()='Commerce']`,
        learningPathLink: "//a[text()='Learning Path']",
        //learningPathLink:"//a[text()='Learning Path']",
        certificationLink: "//a[text()='Certification']",
        completionCertificationLink: "//a[text()='Completion Certificate']",       
     //   learningPathLink:"//a[text()='Learning Path']",       
        communicationLink:"//span[text()='Communication']",
        bannerMenu:`//a[text()='Banner']`,
        createBannerbutton:`//button[text()='CREATE BANNER']`,
        announcementMenu:`//a[text()='Announcement']`,
        createAnnouncementbutton:`//button[text()='CREATE ANNOUNCEMENT']`,

    };

        role:string

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        // this.common(page, context).catch(err => console.error("Error in common setup:", err));
        // this.setupPageListeners();
        // this.adminLogin=new AdminLogin(page,context)
        // this.common(page,context).catch(err => console.error("Error in common setup:", err));
      //  this. setupPageListeners();

    
    }

    public async loadAndLogin(role:string) {
    
        console.log("Loading admin home page...");
        await this.adminLogin(role);
        await this.wait('mediumWait');
        let pageTitle = await this.getTitle();
        console.log("Page Title:", pageTitle);
        if (pageTitle.toLowerCase().includes("signin")) {
            console.log("Sign-in page detected. Performing login...");
            await this.adminLogin(role);
           
            await this.wait('mediumWait');
            pageTitle = await this.getTitle();
            console.log("Page Title after login:", pageTitle);
        }
    } catch(Error: any) {
        console.error("Error during common setup:", Error);
        throw Error;

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
        await this.mouseHover(`//div[text()='${menu}']//ancestor::div[@class='item-draggable']`, "Menu");
        await this.click(this.selectors.dragableMenu(menu), "Create", "Button");
    }

    public async clickLearningPath() {
        await this.mouseHover(this.selectors.learningPathLink, "Learning Path");
        await this.click(this.selectors.learningPathLink, "Learning Path", "Button");
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

    public async adminGroup() {
        await this.click(this.selectors.adminGroupLink, "AdminGroup", "Link");
    }

    public async locationLink() {
        await this.click(this.selectors.locationLink, "Location", "Link");
    }

    async clickCommerceMenu() {
        this.click(this.selectors.commerceMenu, "Commerce Menu", "Button")
    }

    public async clickCompletionCertification() {
        await this.mouseHover(this.selectors.completionCertificationLink, "Completion Certification");
        await this.click(this.selectors.completionCertificationLink, "CompletiionCertification", "Link");
    }

    public async clickCertification() {
        await this.mouseHover(this.selectors.certificationLink, "Certification");
        await this.click(this.selectors.certificationLink, "Certification", "Link");
    }

    public async clickCommunicationLink(){
        await this.mouseHover(this.selectors.communicationLink,"Communication")

        await this.click(this.selectors.communicationLink,"Communication","Link")

    }
    public async clickBanner(){
        await this.mouseHover(this.selectors.bannerMenu,"Banner")
        await this.click(this.selectors.bannerMenu,"Banner","Link")
    }

    public async clickCreateBanner(){
        await this.click(this.selectors.createBannerbutton,"Create Banner","Button")
    }

    public async clickAnnouncement(){
        await this.click(this.selectors.announcementMenu,"Announcement","Link")
    }

    public async clickCreateAnnouncement(){
        await this.click(this.selectors.createAnnouncementbutton,"Create Banner","Button")
    }



}


