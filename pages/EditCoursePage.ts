import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Locator, Page } from "@playwright/test";

export class EditCoursePage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        closeBtn: "//button[text()='Close']",
        courseMenu: (menuName: string) => `//span//span[text()='${menuName}']`,
        tagMenu:"//span//span[text()='Tags']",
        completionCertificateMenu:"//span//span[text()='Completion Certificate']",
        tagsSearchField: "//input[@id='tags-search-field']",
        tagListItem: (tagName: string) => `//li[text()='${tagName}']`,
        okBtnTag:"(//button[text()='OK'])",
        okBtnCertificate: "(//button[text()='OK'])[2]",
        certificateSearchField: "#exp-search-certificate-field",
        certificateRadioBtn: (certificateName: string) => `(//div[text()='${certificateName}']/following::i)[1]`,
        addBtn: "//button[text()='Add']"
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async clickClose() {
        await this.click(this.selectors.closeBtn, "Close", "Button");
    }

    async clickTagMenu() {
        const selector = this.selectors.tagMenu;
        await this.click(selector, "Tags", "Link");
    }

    async clickCompletionCertificate() {
        const selector = this.selectors.completionCertificateMenu;
        await this.click(selector, "completion Certificate", "Link");
    }

    async selectTags(tagName: string) {
        await this.typeAndEnter(this.selectors.tagsSearchField, "Type to select tag or add tag", tagName);
        const tagSelector = this.selectors.tagListItem(tagName);
        //await this.validateElementVisibility(tagSelector, tagName);
        await this.wait('minWait')
        await this.click(this.selectors.okBtnTag, "OK", "Button");
    }

    async selectCourseCompletionCertificate(certificateName: string) {
        await this.typeAndEnter(this.selectors.certificateSearchField, "Search", certificateName);
        const certSelector = this.selectors.certificateRadioBtn(certificateName);
        await this.click(certSelector, "Certificate", "Radio button");
        await this.click(this.selectors.addBtn, "Add", "Button");
        await this.click(this.selectors.okBtnCertificate, "OK", "Button");        
    }
}
