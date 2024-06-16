import { Page, BrowserContext } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";

export class CatalogPage extends LearnerHomePage {
    public selectors = {
        ...this.selectors,
        searchInput: (name: string) => `//input[@id="${name}"]`,
        mostRecentMenuItem: (menu: string) => `//div[text()="${menu}"]`,
        enrollButton: (course: string) => `//div[text()='Most Recent']//following::div[text()="${course}"][1]//following-sibling::i[contains(@class,'fa-money-check-edit')]`,
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

    async clickEnrollButton(course: string, name: string) {
        const enrollButtonSelector = this.selectors.enrollButton(course);
        await this.validateElementVisibility(enrollButtonSelector, course);
        await this.click(enrollButtonSelector, name, "Button");
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
