import { Page, BrowserContext } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";

export class CatalogPage extends LearnerHomePage {
    public selectors = {
        ...this.selectors,
        searchInput: (name: string) => `//input[@id="${name}"]`,
        mostRecentMenuItem: (menu: string) => `//div[text()="${menu}"]`,
        createdCourse: ` //div[text()='Most Recent']/following::li[1]`,
        moreButton: (course: string) => `(//div[text()="${course}"]/following::a/i)[1]`,
        enrollIcon: `//div[text()='Most Recent']//following::i[contains(@class,'tooltipIcon fa-duotone')][1]`,
        selectCourse: (course: string) => `(//span[text()="${course}"])[2]/following::i[5]`,
        enrollButton:`//span[text()='Enroll']`,
        launchButton: (name: string) => `//button[text()="${name}"]`,
        completedButton: (name: string) => `//a[contains(text(),"${name}")]`,
        completedCourse: (name: string) => `(//h5[text()="${name}"])[1]`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async searchCatalog(name: string, data: string) {
        const searchSelector = this.selectors.searchInput(name);
        await this.type(searchSelector, name, data);
        await this.keyboardAction(searchSelector, "Enter", "Input", name);
        await this.page.waitForTimeout(10000);
    }

    async mostRecent(menu: string) {
        await this.mouseHover(this.selectors.mostRecentMenuItem(menu), menu);
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

    async clickSelectcourse(course:string){
        await this.click(this.selectors.selectCourse(course),"Checkbox","Button")
    }
    async clickEnroll(){
        
        await this.click(this.selectors.enrollButton,"Enroll","Button")
    }

    async clickLaunchButton(name: string) {
        const launchButtonSelector = this.selectors.launchButton(name);
        await this.click(launchButtonSelector, name, "Button");
        await this.waitForElementHidden("//div[@class='mb-5 router-view']", "Loading");
    }
    async clickCompletedButton(name: string) {
        await this.page.waitForTimeout(10000);
        const completedButtonSelector = this.selectors.completedButton(name);
        await this.mouseHover(completedButtonSelector, name);
        await this.validateElementVisibility(completedButtonSelector, name);
        await this.click(completedButtonSelector, name, "Button");
    }

    async verifyCompletedCourse(name: string) {
        const completedCourseSelector = this.selectors.completedCourse(name);
        await this.mouseHover(completedCourseSelector, "Text");
    }
}
