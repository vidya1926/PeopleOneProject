import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Locator, Page } from "@playwright/test";

export class EditCoursePage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        closeBtn: "//button[text()='Close']",
        courseMenu: (menuName: string) => `//span//span[text()='${menuName}']`,
        tagsSearchField: "//input[@id='tags-search-field']",
        tagListItem: (tagName: string) => `//li[text()='${tagName}']`,
        okBtn: "//button[text()='OK']",
        certificateSearchField: "#exp-search-field",
        certificateRadioBtn: (certificateName: string) => `(//div[text()='${certificateName}']/following::i)[1]`,
        addBtn: "//button[text()='Add']"
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async clickClose() {
        await this.click(this.selectors.closeBtn, "Close", "Button");
    }

    async clickCourseMenu(menuName: string) {
        const selector = this.selectors.courseMenu(menuName);
        await this.click(selector, menuName, "Link");
    }

    async selectTags(tagName: string) {
        await this.typeAndEnter(this.selectors.tagsSearchField, "Type to select tag or add tag", tagName);
        const tagSelector = this.selectors.tagListItem(tagName);
        await this.validateElementVisibility(tagSelector, tagName);
        await this.click(this.selectors.okBtn, "OK", "Button");
    }

    async selectCourseCompletionCertificate(certificateName: string) {
        await this.typeAndEnter(this.selectors.certificateSearchField, "Search", certificateName);
        const certSelector = this.selectors.certificateRadioBtn(certificateName);
        await this.click(certSelector, "Certificate", "Radio button");
        await this.click(this.selectors.addBtn, "Add", "Button");
        await this.click(this.selectors.okBtn, "OK", "Button");        
    }
}
