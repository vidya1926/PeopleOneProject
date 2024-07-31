import path from "path";
import { PlaywrightWrapper } from "../utils/playwright";
import { AdminHomePage } from "./AdminHomePage";

import { FakerData, getCurrentDateFormatted, gettomorrowDateFormatted } from "../utils/fakerUtils";

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
        //addCourseBtn:"//button[text()='Add Selected Course']",
        addCourseBtn: "(//button[text()=' Add Course'])[1]",  //-->changed on 05/07/2024
        addCourseCheckBox: "//i[contains(@class,'fa-duotone fa-square icon')]",
        courseChexbox: (course: string) => `(//div[text()='${course}']//following::i[contains(@class,'square icon')])[1]`,
        checkBox: (index: string) => `(//i[contains(@class,'fa-duotone fa-square icon')])[${index}]`,
        addSelectedCourseBtn: "//button[text()='Add Selected Course']",
        detailsTab: "//button[text()='Details']",
        catalogBtn: "(//label[@for='publishedcatalog']/i[contains(@class,'fa-circle icon')])[1]",
        updateBtn: "//button[text()='Update']",
        editLearningPathBtn: "//a[text()='Edit Learning Path']",
        addCourseSearchInput: "input[id^='program-structure-title-search']",
        successMessage: "//div[@id='lms-overall-container']//h3",
        createCertification: "//button[text()='CREATE CERTIFICATION']",
        editCertification: "//a[text()='Edit Certification']",
        hasRecertification: "//span[text()='Has Recertification']/preceding::i[contains(@class,'fad fa-square icon')]",
        expiresBtn: "//label[text()='Expires']/parent::div//button[contains(@class,'customselectpicker')]",
        expiresInput: "//label[text()='Expires']/parent::div/input",
        daysLocator: "//span[text()='Days']",
        monthsLocator: "//span[text()='Months']",
        yearsLocator: "//span[text()='Years']",
        price: "input#program-price",
        saveAsDraftCheckbox: "//span[text()='Save as Draft']/preceding::i[1]",
        currencyButton: "(//label[text()='Currency']/parent::div//button)[1]",
        currencyCount: "//label[text()='Currency']/parent::div//span[@class='text']",
        currencyIndex: (index: any) => `(//label[text()='Currency']/parent::div//span[@class='text'])[${index}]`,
        complianceBtn: "(//label[text()='Compliance']/parent::div//button)[1]",
        complianceYesBtn: "//footer//following::span[text()='Yes']",
        completeByRuleBtn: "(//label[text()='Complete by Rule']/parent::div//button)[1]",
        completeByInput: "//label[text()='Complete by']/parent::div//input",
        registractionEndsInput: "input#registration-ends-input",
        enforceLabel:"//span[text()='Enforce Sequencing']",
        enforceSequencingCheckbox: "//span[text()='Enforce Sequencing']/preceding-sibling::i[@class='fa-duotone fa-square']",
        recertificationAddCourse: "//label[text()='Recertification ']/parent::div//following-sibling::div//button[text()=' Add Course']",
        recertificationSaveBtn: "//label[text()='Recertification ']/parent::div//following-sibling::div//button[text()='SAVE']",
        verifyRecertificationCourse: (course: string) => `//label[text()='Recertification ']/parent::div//following-sibling::div//span[text()='${course}']`,
        usCurrency: "//span[text()='US Dollar']",
        domainDropdown: "//a[@class='dropdown-item selected']",
        domainDropdownValue: "//label[text()='Domain']/following-sibling::div//div[contains(@class,'dropdown-menu')]//span[@class='text']",
        domainSelectedText: "//div[contains(text(),'selected')]",
        domainOption: (domain_name: string) => `//div[@class='dropdown-menu show']//span[text()='${domain_name}']`,


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
        await this.click(this.selectors.daysLocator, "Days", "Button")
        await this.type(this.selectors.expiresInput, "Expires Input", "1")
    }

    async description(data: string) {
        await this.type(this.selectors.description, "Description", data)
    }
    async selectSpecificPortal(portal:string) {
        const text = await this.page.innerText(this.selectors.domainSelectedText);
        console.log(text);
        if (text.includes('selected')) {
            //const dropdownItems = this.page.locator(this.selectors.domainDropdown);
            await this.click(this.selectors.domainSelectedText, "dropdown", "button")
            const dropdownValues = await this.page.locator(this.selectors.domainDropdownValue).allInnerTexts();
            for (let index = 0; index < dropdownValues.length; index++) {
                const value = dropdownValues[index];
                if (value !== portal) {
                    await this.click(`//span[@class='text' and text()='${value}']`, "Domain", "Dropdown");
                }
            }

        }
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
        await this.mouseHover(this.selectors.addCourseBtn, "Add Course Button");
        //await this.click(this.selectors.addCourseBtn, "Add Course Button", "Button");
        await this.page.locator(this.selectors.addCourseBtn).last().click({ force: true })
    }

    async searchAndClickCourseCheckBox(data: string) {
        //await this.typeAndEnter(this.selectors.addCourseSearchInput, "Course Serach Input", data) --> changed in new update('16/07/2024')
        //"//input[contains(@id,'program-structure-title-search')]"
        const addCourseInput = this.page.locator(this.selectors.addCourseSearchInput).last();
        await addCourseInput.focus(),
            await this.page.keyboard.type(data, { delay: 150 })
        await this.page.keyboard.press('Enter');

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

    async enterPrice() {
        await this.type(this.selectors.price, "price", FakerData.getPrice());
    }
    async clickAddSelectCourse() {
        await this.click(this.selectors.addSelectedCourseBtn, "Add Select Course", "Button");
        await this.wait('minWait');
        const count = await this.page.locator("//span[@class='text-truncate']").count();
        for (let index = 0; index < count; index++) {
            const text = await this.page.locator("//span[@class='text-truncate']").nth(index).innerText();
            console.log("Selected Course =" + text);
        }

    }

    async clickEnforceCheckbox() {
        let enforceCheckbox = this.selectors.enforceSequencingCheckbox
        await this.validateElementVisibility(this.selectors.enforceLabel, "Enforce Sequence");
        await this.wait('minWait');
        await this.mouseHover(this.selectors.enforceLabel, "Enforce Sequence");
        await this.click(enforceCheckbox, "Enforce Sequence", "Checkbox");
    }

    async clickDetailTab() {
        await this.validateElementVisibility(this.selectors.detailsTab, "Details");
        await this.wait('mediumWait')
        await this.page.keyboard.press('PageUp');
        await this.click(this.selectors.detailsTab, "Details", "Button");
    }

    async clickCatalogBtn() {
        await this.mouseHover(this.selectors.catalogBtn, "Show Catalog");
        await this.click(this.selectors.catalogBtn, "Show Catalog", "Button");
    }
    async clickCurrency() {
        await this.click(this.selectors.currencyButton, "Currency", "Button");
        //const count = await this.page.locator(this.selectors.currencyCount).count();
        // const randomCount = Math.floor(Math.random() * (count)) + 1;
        //await this.click(this.selectors.currencyIndex(randomCount), "Currency", "DropDown")
        await this.click(this.selectors.usCurrency, "US Dollar", "DropDown")

    }

    async clickUpdateBtn() {
        await this.mouseHover(this.selectors.updateBtn, "Update");
        await this.click(this.selectors.updateBtn, "Update", "Button");
        await this.spinnerDisappear();
    }

    async verifySuccessMessage() {
        await this.verification(this.selectors.successMessage, "successfully.");
    }

    async clickEditCertification() {
        await this.validateElementVisibility(this.selectors.editCertification, "Edit Certification");
        await this.click(this.selectors.editCertification, "Edit Certification", "Button");
    }

    async clickSaveAsDraftBtn() {

        await this.mouseHover(this.selectors.saveAsDraftCheckbox, "Save As Draft");
        await this.click(this.selectors.saveAsDraftCheckbox, "Save As Draft", "CheckBox");
    }

    async clickEditLearningPath() {
        await this.mouseHover(this.selectors.editLearningPathBtn, "Edit Learning Path");
        await this.click(this.selectors.editLearningPathBtn, "Edit Learning Path", "Button");
    }

    async clickAndSelectCompliance() {
        await this.mouseHover(this.selectors.complianceBtn, "Compliance");
        await this.click(this.selectors.complianceBtn, "Compliance", "Button");
        await this.click(this.selectors.complianceYesBtn, "Compliance", "Button");
    }

    async clickAndSelectCompleteByRule() {
        await this.keyboardType(this.selectors.completeByInput, gettomorrowDateFormatted());
    }

    async addRecertificationCourse() {
        await this.mouseHover(this.selectors.recertificationAddCourse, "Add Course");
        await this.click(this.selectors.recertificationAddCourse, "Add Course", "Button");
    }

    async saveRecertification(data: string) {
        await this.mouseHover(this.selectors.recertificationSaveBtn, "Save");
        await this.click(this.selectors.recertificationSaveBtn, "Save", "Button");
        await this.verification(this.selectors.verifyRecertificationCourse(data), data);
    }

    async registractionEnds() {
        await this.keyboardType(this.selectors.registractionEndsInput, gettomorrowDateFormatted());
    }
}