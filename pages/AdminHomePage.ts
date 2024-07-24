import { Page, BrowserContext, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/credentialConstants";
import { AdminLogin } from "./AdminLogin";

export class AdminHomePage extends AdminLogin {
    static pageUrl = URLConstants.adminURL;

    public selectors = {
        signOutLink: "//div[@class='logout']/a",
        dragableMenu: (menu: string) =>`//div[text()='${menu}']/following::div[text()="Create"][1]`,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        learningMenu: "//span[text()='Learning']",
        surveyMenu: "//span[text()='Survey']",
        surveyLink: "//a[text()='Survey']",
        courseLink: "//a[text()='Course']",
        createCourseBtn: "//button[text()='CREATE COURSE']",
        userMenu: "//a[text()='User']",
        metadataLibraryMenu: "//span[text()='metadata library']",
        metaPeopleLink: "//a[text()='People']",
        metaLearningLink: "//a[text()='Learning']",
        metaECommerceLink: "//a[text()='E-Commerce']",
        metaGeneralLink: "//a[text()='General']",
        adminGroupLink: "//a[text()='Admin Group']",
        learnerGrouplink:`//a[text()='Learner Group']`,
        locationLink: "//a[text()='Location']",
        commerceMenu: `//span[text()='Commerce']`,
        learningPathLink: "//a[text()='Learning Path']",
        //learningPathLink:"//a[text()='Learning Path']",
        certificationLink: "//a[text()='Certification']",
        completionCertificationLink: "//a[text()='Completion Certificate']",
        //learningPathLink:"//a[text()='Learning Path']",       
        communicationLink: "//span[text()='Communication']",
        bannerMenu: `//a[text()='Banner']`,
        createBannerbutton: `//button[text()='CREATE BANNER']`,
        announcementMenu: `//a[text()='Announcement']`,
        createAnnouncementbutton: `//button[text()='CREATE ANNOUNCEMENT']`,
        contentMenu: `//a[text()='Content']`,
        surveyQuestionsLink: "//span[text()='Survey']//parent::div/following-sibling::ul//a[text()='Questions']",
        //surveyLink:"//span[text()='Survey']//parent::div/following-sibling::ul//a[text()='Survey']",
        assessmentMenu: `//span[text()='Assessment']`,
        assessmentQuestionLink: `//span[text()='Assessment']//parent::div/following-sibling::ul//a[text()='Questions']`,
        assessmentLink: "//a[text()='Assessment']",
    };



    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        //this.common(page, context).catch(err => console.error("Error in common setup:", err));
       // this.setupPageListeners();


    }

    public async loadAndLogin(role: string) {

        console.log("Loading admin home page...");
        await this.page.goto(AdminLogin.pageUrl);
        await this.adminLogin(role);
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

/* 
    private setupPageListeners() {
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
            const logoutButton = this.page.locator("//div[@class='logout']");
            const title = await this.page.title();
            if (title == " 500 Internal Server Error") {
                await this.page.reload();
            } else {
                await expect(logoutButton, { message: "Successfully Logged In" }).toBeVisible();
            }
        } catch (err) {
            console.error("Error executing common method after load:", err);
            throw err;
        }
    } */

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

    public async survey() {
        await this.validateElementVisibility(this.selectors.surveyMenu, "Survey");
        await this.click(this.selectors.surveyMenu, "Survey", "Button");
    }

    public async clickOnsurveyLink() {
        await this.validateElementVisibility(this.selectors.surveyLink, "Survey");
        await this.click(this.selectors.surveyLink, "Survey", "Button");
    }



    public async clickOnAssessmentLink() {
        await this.validateElementVisibility(this.selectors.assessmentLink, "Assessment");
        await this.click(this.selectors.assessmentLink, "Assessment", "Link");
    }

    public async clickOnSurveyQuestionLink() {
        await this.mouseHover(this.selectors.surveyQuestionsLink, "Questions");
        await this.click(this.selectors.surveyQuestionsLink, "Questions", "Link");
    }

    public async assessmentMenu() {
        await this.validateElementVisibility(this.selectors.assessmentMenu, "Assessment");
        await this.click(this.selectors.assessmentMenu, "Assessment", "Button");
    }



    public async clickOnAssessmentQuestionLink() {
        await this.mouseHover(this.selectors.assessmentQuestionLink, "Questions");
        await this.click(this.selectors.assessmentQuestionLink, "Questions", "Link");
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

    public async meta_ECommerce() {
        await this.validateElementVisibility(this.selectors.metaECommerceLink, "People");
        await this.mouseHover(this.selectors.metaECommerceLink, "People");
        await this.click(this.selectors.metaECommerceLink, "People", "Button");
    }

    public async meta_learning() {
        await this.validateElementVisibility(this.selectors.metaLearningLink, "Learning");
        await this.mouseHover(this.selectors.metaLearningLink, "Learning");
        await this.click(this.selectors.metaLearningLink, "Learning", "Button");
        await this.spinnerDisappear();
    }

    public async metaGeneralLink() {
        await this.validateElementVisibility(this.selectors.metaGeneralLink, "Learning");
        await this.mouseHover(this.selectors.metaGeneralLink, "Learning");
        await this.click(this.selectors.metaGeneralLink, "Learning", "Button");
        await this.spinnerDisappear();
    }



    async enter(name: string, data: string) {
        await this.type(`//input[@id="${name}"]`, name, data);
    }

    public async adminGroup() {
        await this.click(this.selectors.adminGroupLink, "AdminGroup", "Link");
    }

    
    public async learnerGroup() {
        await this.click(this.selectors.learnerGrouplink, "AdminGroup", "Link");
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

    public async clickCommunicationLink() {
        await this.mouseHover(this.selectors.communicationLink, "Communication")

        await this.click(this.selectors.communicationLink, "Communication", "Link")

    }
    public async clickBanner() {
        await this.mouseHover(this.selectors.bannerMenu, "Banner")
        await this.click(this.selectors.bannerMenu, "Banner", "Link")
    }

    public async clickCreateBanner() {
        await this.validateElementVisibility(this.selectors.createBannerbutton, "Create Banner")
        await this.click(this.selectors.createBannerbutton, "Create Banner", "Button")
    }

    public async clickAnnouncement() {
        await this.click(this.selectors.announcementMenu, "Announcement", "Link")
    }

    public async clickCreateAnnouncement() {
        await this.click(this.selectors.createAnnouncementbutton, "Create Banner", "Button")
    }

    public async clickContentmenu() {
        await this.click(this.selectors.contentMenu, "Content", "Link")

    }

}


