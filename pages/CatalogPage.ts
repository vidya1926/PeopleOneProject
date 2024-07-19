import { Page, BrowserContext } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";
//import { VideoPlayer } from "../utils/videoplayerUtils";
//import { playAndForwardVideo } from "../utils/videoplayerUtils";

export class CatalogPage extends LearnerHomePage {
    public selectors = {
        ...this.selectors,
        searchInput: `//input[@id="exp-searchcatalog-search-field"]`,
        mostRecentMenuItem: `//div[text()="Most Recent"]`,
        createdCourse: ` //div[text()='Most Recent']/following::li[1]`,
        moreButton: (course: string) => `(//div[text()="${course}"]/following::a/i)[1]`,
        enrollIcon: `//div[text()='Most Recent']//following::i[contains(@class,'tooltipIcon fa-duotone')][1]`,
        selectCourse: (course: string) => `//span[text()='${course}']//following::i[contains(@class,'fa-circle icon')][1]`,
        enrollButton: `//span[text()='Enroll']`,
        //launchButton:`//button[text()="Launch Content"]`,
        completedButton: `//a[contains(text(),"Completed")]`,
        completedCourse: (name: string) => `(//h5[text()="${name}"])[1]`,
        filterField: `//h1[text()='Catalog']/following::div[text()='Filters']`,
        searchButton: `(//span[text()='Tags']/following::div[text()='Select'])[1]`,
        selectTagnames: `//div[contains(@class,'dropdown-menu show')]//input`,
        reultantTagname: (tagname: string) => `//span[text()='${tagname}']`,
        applyButton: `//button[text()='Apply']`,
        viewCourseDetails: `//button[text()='View Course Details']`,
        launchButton: `(//div//i[@aria-label='Click to play'])[1]`,
        saveLearningStatus: "//button[text()='Save Learning Status']",
        verificationEnrollment: "//span[text()='View Certificate']",
        unsupportMedia: "//div[contains(text(), 'The media could not be loaded')]",
        posterElement: `//button[@class='vjs-big-play-button']//span[1]`,
        viewCertificationDetailsBtn: "//button[text()='View Certification Details']",
        viewlearningPathDetailsBtn: "//button[text()='View Learning Path Details']",
        viewCertificateBtn: "//div[text()='modules/courses']/parent::div//span[text()='View Certificate']",
        okBtn: "//button[text()='Ok']",
        addToCart: `//span[text()='Add to cart']`,
        contentLaunchBtn: "//button//span[text()='Launch']",
        contentsLabel: "//button[text()='Save Learning Status']//following::span[contains(text(),'Content')]",
        completedVideo: "//span[text()='100%']",
        expiredContent: "//span[text()='Expired']",
        recertifyBtn: "//span[text()='Recertify']",
         shoppingCardIcon: "//div[@aria-label='shopping cart']//i[contains(@class,'cart-shopping')]",


        //`//button[@title='Play Video']//span[1]`


    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async searchCatalog(data: string) {
        const searchSelector = this.selectors.searchInput;
        await this.type(searchSelector, "Search Field", data);
        await this.keyboardAction(searchSelector, "Enter", "Input", "Search Field");
        await this.page.waitForTimeout(10000);
    }

    async mostRecent() {
        await this.validateElementVisibility(this.selectors.mostRecentMenuItem, "Most Recent");
        await this.mouseHover(this.selectors.mostRecentMenuItem, "Most Recent");
    }

    async clickMoreonCourse(courseName: string) {
        await this.mouseHover(this.selectors.moreButton(courseName), "More on Course")
        await this.click(this.selectors.moreButton(courseName), "More on Course", "icon")
    }


    async clickEnrollButton() {
        await this.mouseHover(this.selectors.createdCourse, "CreatedCourse")
        const enrollButtonSelector = this.selectors.enrollIcon;
        await this.validateElementVisibility(enrollButtonSelector, "Course");
        await this.click(enrollButtonSelector, "Enrolling Course", "Button");
    }

    async clickSelectcourse(course: string) {
        await this.click(this.selectors.selectCourse(course), "Checkbox", "Button")
    }
    async clickEnroll() {

        await this.click(this.selectors.enrollButton, "Enroll", "Button");
        const cancelEnrollmentBtn = this.page.locator("//span[text()='Cancel Enrollment']");
        await this.validateElementVisibility(cancelEnrollmentBtn, "Cancel Enrollement");

    }

    async clickRecertify() {
        await this.validateElementVisibility(this.selectors.recertifyBtn, "Recertify")
        await this.click(this.selectors.recertifyBtn, "Recertify", "Button");
        await this.validateElementVisibility(this.selectors.viewCertificateBtn, "View Certificate");
        await this.mouseHover(this.selectors.completedVideo, "Completed Video");
        await this.wait('mediumWait');
    }
    // async clickLaunchButton() {

    //    // playAndForwardVideo(this.selectors.launchButton)
    //     const launchButtonSelector = this.selectors.launchButton;
    //     await this.validateElementVisibility(launchButtonSelector,"Play Button");
    //     await this.mouseHover(launchButtonSelector, "Launch Button")
    //     await this.click(launchButtonSelector, "Launch Button", "Button");
    //     try {
    //         await this.wait('mediumWait');
    //         await this.validateElementVisibility("//span[text()='0:00']", "time")
    //     } catch (error) {
    //         console.log("Its not a video content")

    //     }
    // }

    // async saveLearningStatus(){
    //     await this.click(this.selectors.saveLearningStatus,"save","button")
    // }

    async clickLaunchButton() {
        await this.page.waitForLoadState('load');
        await this.wait('maxWait');
        const playButton = "//button[@title='Play Video']"
        /*  const myElement = document.querySelector("#movie_player") as HTMLElement; 
         myElement.addEventListener("click", (event) => {
             myElement.click()
           }); */
        await this.mouseHover(playButton, "Play Button")
        await this.page.focus(playButton, { strict: true });
        await this.page.click(playButton, { force: true })
        await this.wait('maxWait');
        await this.wait('mediumWait');
    }

    async saveLearningStatus() {
        await this.click(this.selectors.saveLearningStatus, "save", "button");
        await this.validateElementVisibility(this.selectors.verificationEnrollment, "button");
        await this.spinnerDisappear();
        const completed = this.page.locator(this.selectors.completedVideo);
        try {
            if (await completed.isVisible()) {
                await completed.hover({ force: true });
                console.log("The Video Has Completed");
            } else {
                await this.clickLaunchButton();
                await this.saveLearningStatus();
            }
        } catch (error) {
            console.log("Try to launch the button");

        }

    }



    async clickCompletedButton() {
        await this.page.waitForTimeout(10000);
        const name = "Completed Button";
        const completedButtonSelector = this.selectors.completedButton;
        await this.mouseHover(completedButtonSelector, name);
        await this.validateElementVisibility(completedButtonSelector, name);
        await this.click(completedButtonSelector, name, "Button");
    }

    async verifyCompletedCourse(name: string) {
        const completedCourseSelector = this.selectors.completedCourse(name);
        await this.mouseHover(completedCourseSelector, "Text");
    }

    async clickFilter() {
        await this.click(this.selectors.filterField, "Filter Search", "clicked")
    }

    async verifyExpiredContent() {
        await this.validateElementVisibility(this.selectors.expiredContent, "Expired");
        await this.verification(this.selectors.expiredContent, "Expired")
    }

    async enterSearchFilter(): Promise<string> {
        const tags = ["Empower", "Facilitate", "card", "matrix", "Testing", "Evolve schemas"];
        const randomIndex = Math.floor(Math.random() * tags.length); // Corrected random index generation
        const randomTag = tags[randomIndex];
        await this.click(this.selectors.searchButton, "Tagname", "Field")
        await this.type(this.selectors.selectTagnames, "Tagname", randomTag)
        return randomTag;
    }

    async selectresultantTags() {
        await this.mouseHover(this.selectors.reultantTagname(this.enterSearchFilter()), "Tags")
        await this.click(this.selectors.reultantTagname(this.enterSearchFilter()), "Tags", "selected")
    }

    async clickApply() {
        await this.click(this.selectors.applyButton, "Apply", "Button")
    }

    async viewCoursedetails() {
        await this.click(this.selectors.viewCourseDetails, "Coursedetails", "Button");
    }
    // async searchCatalog(courseName:string){
    //     await this.validateElementVisibility(this.selectors.searchCatalog,"Textbox");
    //     await this.type(this.selectors.searchCatalog, "Search", courseName);
    // }

    async clickViewCertificationDetails() {
        await this.validateElementVisibility(this.selectors.viewCertificationDetailsBtn, "View Certification Details");
        await this.click(this.selectors.viewCertificationDetailsBtn, "View Certification Details", "Button");
        await this.page.waitForLoadState('load');

    }

    async clickViewLearningPathDetails() {
        await this.validateElementVisibility(this.selectors.viewlearningPathDetailsBtn, "View Learning Path Details");
        await this.click(this.selectors.viewlearningPathDetailsBtn, "View Learning Path Details", "Button");
        await this.page.waitForLoadState('load');
    }

    async clickOkButton() {
        await this.validateElementVisibility(this.selectors.okBtn, "View Certification Details");
        await this.click(this.selectors.okBtn, "View Certification Details", "Button");
        await this.page.waitForLoadState('load');

    }

    async clickContentLaunchButton() {
        await this.mouseHover(this.selectors.contentLaunchBtn, "Launch");
        await this.click(this.selectors.contentLaunchBtn, "Launch", "Button");
        await this.spinnerDisappear();
    }

    async clickViewCertificate() {
        await this.mouseHover(this.selectors.viewCertificateBtn, "View Certificate");
        await this.click(this.selectors.viewCertificateBtn, "View Certificate", "Button");
        await this.wait('minWait')

    }

    public async addToCart() {
        await this.click(this.selectors.addToCart, "Add to cart", "Button")
    }

    public async clickShoppingCartIcon(){
        await this.mouseHover(this.selectors.shoppingCardIcon,'Shopping Cart Icon');
        await this.click(this.selectors.shoppingCardIcon,'Shopping Cart Icon',"Icon");
    }

    public async handlingAdditionalContents() {
        await this.mouseHover(this.selectors.contentsLabel, "Contents");
        await this.click("", "", "")
    }




}
