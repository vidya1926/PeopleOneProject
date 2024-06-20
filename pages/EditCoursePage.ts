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
        addBtn: "//button[text()='Add']",
        tagsSuccesfully:"//div[@id='staticBackdrop' and contains(@class,'show')]//following::span[contains(text(),'successfully.')]"
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

    async selectTags() {
        const tags = ["Empower", "Facilitate", "card", "matrix", "Testing", "Evolve schemas"];
        const randomIndex = Math.floor(Math.random() * tags.length); // Corrected random index generation
        const randomTag = tags[randomIndex]; 
        await this.type(this.selectors.tagsSearchField, "Type to select tag or add tag", randomTag);
        await this.keyboardAction(this.selectors.tagsSearchField,"Backspace","Search Field",randomTag)
        await this.click(`//li[text()='${randomTag}']`,randomTag,"Button")
        await this.validateElementVisibility(this.selectors.tagsSuccesfully,"Tags")
        await this.verification(this.selectors.tagsSuccesfully,"Tag has been added successfully.")
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
