import { Page, BrowserContext } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";
import { playAndForwardVideo } from "../utils/videoplayerUtils";

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
        launchButton: `//i[@aria-label='Click to play']`,
        saveLearningStatus: "//button[text()='Save Learning Status']"
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

        await this.click(this.selectors.enrollButton, "Enroll", "Button")
    }

    async clickLaunchButton() {
        
       // playAndForwardVideo(this.selectors.launchButton)
        const launchButtonSelector = this.selectors.launchButton;
        await this.validateElementVisibility(launchButtonSelector,"Play Button");
        await this.mouseHover(launchButtonSelector, "Launch Button")
        await this.click(launchButtonSelector, "Launch Button", "Button");
        try {
            await this.wait('mediumWait');
            await this.validateElementVisibility("//span[text()='0:00']", "time")
        } catch (error) {
            console.log("Its not a video content")

        }
    }

    async saveLearningStatus(){
        await this.click(this.selectors.saveLearningStatus,"save","button")
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
}
