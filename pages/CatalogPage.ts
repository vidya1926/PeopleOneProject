import { Page, BrowserContext } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";
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
        unsupportMedia: "//div[contains(text(), 'The media could not be loaded')]"

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
        await this.mouseHover(this.selectors.mostRecentMenuItem, "Most Recent");
    }

    async clickMoreonCourse(courseName: string) {
        await this.mouseHover(this.selectors.moreButton(courseName), "More on Course")
        await this.click(this.selectors.moreButton(courseName), "More on Course", "icon")
    }


    async clickEnrollButton(course: string, name: string) {
        await this.mouseHover(this.selectors.createdCourse, "CreatedCourse")
        const enrollButtonSelector = this.selectors.enrollIcon;
        await this.validateElementVisibility(enrollButtonSelector, course);
        await this.click(enrollButtonSelector, name, "Button");
    }

    async clickSelectcourse(course: string) {
        await this.click(this.selectors.selectCourse(course), "Checkbox", "Button")
    }
    async clickEnroll() {

        await this.click(this.selectors.enrollButton, "Enroll", "Button");
        const cancelEnrollmentBtn =this.page.locator("//span[text()='Cancel Enrollment']");
        await this.validateElementVisibility(cancelEnrollmentBtn,"Cancel Enrollement");
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
        const launchButtonSelector = this.selectors.launchButton;
        const playButton = "//button[@title='Play Video']"
        await this.wait('maxWait');
        await this.page.focus(playButton);
        await this.page.keyboard.press('Enter');

    }

    async saveLearningStatus() {

        await this.click(this.selectors.saveLearningStatus, "save", "button")
        await this.validateElementVisibility(this.selectors.verificationEnrollment, "button")
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


    async enterSearchFilter(tagname: string) {
        await this.click(this.selectors.searchButton, "Tagname", "Field")
        await this.type(this.selectors.selectTagnames, "Tagname", tagname)

    }

    async selectresultantTags(tagname: string) {
        await this.mouseHover(this.selectors.reultantTagname(tagname), "Tags")
        await this.click(this.selectors.reultantTagname(tagname), "Tags", "selected")
    }

    async clickApply() {
        await this.click(this.selectors.applyButton, "Apply", "Button")
    }
    
    async viewCoursedetails() {
        await this.click(this.selectors.viewCourseDetails, "Coursedetails", "Button")
    }
    // async searchCatalog(courseName:string){
    //     await this.validateElementVisibility(this.selectors.searchCatalog,"Textbox");
    //     await this.type(this.selectors.searchCatalog, "Search", courseName);
    // }


}
