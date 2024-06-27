import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Locator, Page } from "@playwright/test";

export class CompletionCertificationPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        createCompletionCertificateBtn: "//button[text()='CREATE COMPLETION CERTIFICATE']",
        templateType: "//label[text()='Template type']/parent::div//label[contains(@class,'custom-control-label')]",
        randomTemplate: (index: string) => `(//label[text()='Template type']/parent::div//label[contains(@class,'custom-control-label')])[${index}]`,
        title: "//input[@id='title']",
        designCertificateDescription: "//div[@class='note-editable']",
        pictureBtn: "//button[@aria-label='Picture']",
        imgUpload: "input[id^='note-dialog-image-file']",
        publishBtn: "//button[text()='Publish']",
        proceedBtn: "//button[text()='Yes, Proceed']",
        editCertificateBtn:"//a[text()='Edit Certificate']",
        updateBtn:"//button[text()='Update']",
        successfullMessage:"//div[@id='lms-overall-container']//h3"
    }

    async clickCreateCompletionCertificate() {
        await this.mouseHover(this.selectors.createCompletionCertificateBtn, "Create Completion Certificate")
        await this.click(this.selectors.createCompletionCertificateBtn, "Create Completion Certificate", "Button");

    }

    async verify_CompletionCertificateLabel() {

        await this.verification("//h1[text()='Create Completion Certificate']", "Create Completion Certificate")
    }

    async clickTemplateType() {
        const count = await this.page.locator(this.selectors.templateType).count();
        const randomIndex = Math.floor(Math.random() * count);
        await this.click(this.selectors.randomTemplate(randomIndex), "Template Type", "Checkbox");

    }

    async title(data: string) {
        await this.type(this.selectors.title, "Title", data);
    }

    async designCertificate(data: string) {
        await this.type(this.selectors.designCertificateDescription, "Description", data)
        await this.click(this.selectors.pictureBtn, "Picture", "Button");
        const certificate = "../data/dummyCertificate.jpg"
        await this.uploadFile(this.selectors.imgUpload, certificate)

    }

    async clickPublish() {
        await this.validateElementVisibility(this.selectors.publishBtn, "Publish");
        await this.click(this.selectors.publishBtn, "Publish", "Button");
    }

    
    async clickProceed() {
        await this.validateElementVisibility(this.selectors.proceedBtn, "Proceed");
        await this.click(this.selectors.proceedBtn, "Proceed", "Button");
    }

    async clickEditCertificate() {
        await this.validateElementVisibility(this.selectors.editCertificateBtn, "Edit Certificate");
        await this.click(this.selectors.proceedBtn, "Edit Certificate", "Button");
        await this.page.waitForLoadState('networkidle');
    }

    async clickUpdate(){
        await this.mouseHover(this.selectors.updateBtn,"Update");
        await this.validateElementVisibility(this.selectors.updateBtn,"Update");
        await this.click(this.selectors.updateBtn,"Update","Button");
    }

    async verifyCeritificateSuccessMessage() {
        await this.spinnerDisappear();
        await this.verification(this.selectors.successMessage, "successfully");
    }
}