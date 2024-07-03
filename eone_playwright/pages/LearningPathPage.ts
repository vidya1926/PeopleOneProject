import path from "path";
import { PlaywrightWrapper } from "../utils/playwright";
import { AdminHomePage } from "./AdminHomePage";
import fs from "fs"
import { count, log } from "console";
import { th } from "@faker-js/faker";

export class LearningPathPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        createLearningPathBtn: "//button[text()='CREATE LEARNING PATH']",
        title: "//input[@id='program-title']",
        languageBtn: "(//label[text()='Language']//parent::div//button)[1]",
        language: (data: string) => `//a//span[text()='${data}']`,
        description: "//div[@id='program-description']//p",
        saveBtn: "//button[@id='program-btn-save']",
        proceedBtn: "//button[text()='Yes, Proceed']",
        addCourseBtn: "//button[text()=' Add Course']",
        addCourseCheckBox: "//i[contains(@class,'fa-duotone fa-square icon')]",
        courseChexbox: (course: string) => `//div[text()='${course}']//following::i[contains(@class,'square icon')][1]`,
        checkBox: (index: string) => `(//i[contains(@class,'fa-duotone fa-square icon')])[${index}]`,
        addSelectedCourseBtn: "//button[text()='Add Selected Course']",
        detailsTab: "//button[text()='Details']",
        catalogBtn: "//label[@for='publishedcatalog']/i[contains(@class,'fa-circle icon')]",
        updateBtn: "//button[text()='Update']",
        addCourseSearchInput: "input[id^='program-structure-title-search']",
        successMessage: "//div[@id='lms-overall-container']//h3",
        createCertification: "//button[text()='CREATE CERTIFICATION']",
        editCertification: "//a[text()='Edit Certification']",
        hasRecertification: "//span[text()='Has Recertification']/preceding::i[contains(@class,'fad fa-square icon')]",
        expiresBtn: "//label[text()='Expires']/parent::div//button[contains(@class,'customselectpicker')]",
        expiresInput:"//label[text()='Expires']/parent::div/input",
        daysLocator: "//span[text()='Days']",
        monthsLocator: "//span[text()='Months']",
        yearsLocator: "//span[text()='Years']",
        saveAsDraftCheckbox:"//span[text()='Save as Draft']/preceding::i[1]"

    };
    async clickCreateLearningPath() {
        await this.validateElementVisibility(this.selectors.createLearningPathBtn, "Learning Path");
        await this.click(this.selectors.createLearningPathBtn, "Learning Path", "Button");
    }

    async clickCreateCertification() {
        await this.validateElementVisibility(this.selectors.createCertification, "Create Certification");
        await this.click(this.selectors.createCertification, "Create Certification", "Link")
    }

    async title(data: string) {
        await this.validateElementVisibility(this.selectors.title, "Title");
        await this.type(this.selectors.title, "Title", data);
    }

    async language() {
        const data = "English"
        await this.click(this.selectors.languageBtn, "Language", "Button");
        await this.click(this.selectors.language(data), "Language", "Button");
    }

    async hasRecertification() {
        await this.click(this.selectors.hasRecertification, "Has Recertification", "Check Box");
    }

    async clickExpiresButton() {
        await this.click(this.selectors.expiresBtn, "Expires", "Button")
        await this.click(this.selectors.daysLocator,"Days","Button")
        await this.type(this.selectors.expiresInput,"Expires Input","1")
    }

    async description(data: string) {
        await this.type(this.selectors.description, "Description", data)
    }

    async clickSave() {
        await this.click(this.selectors.saveBtn, "Save", "Button");
    }

    async clickProceedBtn() {
        await this.validateElementVisibility(this.selectors.proceedBtn, "Proceed Button");
        await this.click(this.selectors.proceedBtn, "Proceed Button", "Button");
    }

    async clickAddCourse() {
        await this.validateElementVisibility(this.selectors.addCourseBtn, "Add Course Button");
        await this.click(this.selectors.addCourseBtn, "Add Course Button", "Button");
    }

    async searchAndClickCourseCheckBox(data: string) {
        await this.typeAndEnter(this.selectors.addCourseSearchInput, "Course Serach Input", data)
        await this.wait('minWait');
        await this.click(this.selectors.courseChexbox(data), data, "CheckBox")
        // const count = await this.page.locator(this.selectors.addCourseCheckBox).count();
        // function getRandomNumber(min: number, max: number): number {
        //     return Math.floor(Math.random() * (max - min + 1)) + min;
        // }
        // const randomNumber = getRandomNumber(2, count);
        // await this.mouseHover(this.selectors.checkBox(randomNumber), "Add Course CheckBox");
        // await this.click(this.selectors.checkBox(randomNumber), "Add Course CheckBox", "ChexkBox");
    }

    async clickAddSelectCourse() {
        await this.click(this.selectors.addSelectedCourseBtn, "Add Select Course", "Button")
        await this.validateElementVisibility("//span[@class='text-truncate']", "Populated Text");
        const count = await this.page.locator("//span[@class='text-truncate']").count();
        for (let index = 0; index < count; index++) {
            const text = await this.page.innerText("//span[@class='text-truncate']");
            console.log("Selected Course =" + text);
        }

    }

    async clickDetailTab() {
        await this.mouseHover(this.selectors.detailsTab, "Details");
        await this.click(this.selectors.detailsTab, "Details", "Button");
    }

    async clickCatalogBtn() {
        await this.mouseHover(this.selectors.catalogBtn, "Show Catalog");
        await this.click(this.selectors.catalogBtn, "Show Catalog", "Button");
    }

    async clickUpdateBtn() {
        await this.mouseHover(this.selectors.updateBtn, "Update");
        await this.click(this.selectors.updateBtn, "Update", "Button");
        await this.spinnerDisappear();
    }

    async verifyLearningPath() {
        await this.verification(this.selectors.successMessage, "Published successfully.");
    }

    async clickEditCertification() {
        await this.validateElementVisibility(this.selectors.editCertification, "Edit Certification");
        await this.click(this.selectors.editCertification, "Edit Certification", "Button");
    }

    async clickSaveAsDraftBtn(){
        await this.mouseHover(this.selectors.saveAsDraftCheckbox,"Save As Draft");
        await this.click(this.selectors.saveAsDraftCheckbox,"Save As Draft","CheckBox");
    }

}