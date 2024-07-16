import { getRandomItemFromFile } from "../utils/jsonDataHandler";
import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Page } from "@playwright/test";

export class UserPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        createUserLabel: "//h1[text()='Create User']",
        inputField: (name: string) => `//input[@id="${name}"]`,
        addressInput: (label: string) => `//label[contains(text(),'${label}')]/following-sibling::input`,
        dropdownToggle: (label: string) => `(//label[text()='${label}']/following::button[@data-bs-toggle='dropdown'])[1]`,
        dropdownSearchInput: "//footer//following::input[@type='search']",
        dropdownOption: (data: string) => `//span[text()='${data}']`,
        saveButton: "//button[text()='Save']",
        proceedButton: (name: string) => `//footer//following::button[contains(text(),'${name}')]`,
        searchField: "//input[@id='exp-search-field']",
        rolesBtn:"//input[@id='user-roles-filter-field']",
        rolesList: (roles:string)=>`//li[text()='${roles}']`,
        editIcon: "//span[contains(@class,'justify-content-start') and @aria-label='Edit User']",
        userProfileUploadInput: "//input[@id='upload-usr-pic-file']",
        updateButton: "//button[text()='Update']",
        successMessage: "//div[@id='addedit-user-form-container']//h3[contains(text(),'successfully')]",
        employmentTypeInput:"//label[text()='employment type']//parent::div//input",
        commonOptionBtn:(value:string)=>`//li[text()='${value}']`

    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async verifyCreateUserLabel(expectedLabel: string) {
        await this.verification(this.selectors.createUserLabel, expectedLabel);
    }

    async enter(name: string, data: string) {
        const selector = this.selectors.inputField(name);
        await this.type(selector, name, data);
    }

    async typeAddress(label: string, data: string) {
        const selector = this.selectors.addressInput(label);
        await this.type(selector, "Address", data);
    }

    async select(label: string, data: string) {
        const toggleSelector = this.selectors.dropdownToggle(label);
        await this.click(toggleSelector, label, 'Dropdown');
        await this.type(this.selectors.dropdownSearchInput, label, data);
        const optionSelector = this.selectors.dropdownOption(data);
        await this.click(optionSelector, data, 'DropDown');
        await this.verification(toggleSelector, data);
    }

    async selectEmploymentType(){
        let data =getRandomItemFromFile("../data/peopleEmploymentData.json");
        await this.type(this.selectors.employmentTypeInput,"Employment Type",data)
        await this.click(this.selectors.commonOptionBtn(data),data,"List");
    }

    async clickSave() {
        await this.validateElementVisibility(this.selectors.saveButton, 'Save');
        await this.click(this.selectors.saveButton, "Save", "Button");
    }

    async clickProceed(name: string) {
        const buttonSelector = this.selectors.proceedButton(name);
        await this.validateElementVisibility(buttonSelector, name);
        await this.click(buttonSelector, name, "Button");
    }

    async userSearchField(data: string) {
        await this.type(this.selectors.searchField, "Search Field", data);
        await this.keyboardAction(this.selectors.searchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async clickRolesButton(roles:string){
        await this.click(this.selectors.rolesBtn,"Roles","Button");
        await this.click(this.selectors.rolesList(roles),roles,"Button")
    }

    async editIcon() {
        await this.click(this.selectors.editIcon, "Edit Icon", "Button");
        await this.spinnerDisappear();
    }



    async userProfileUpload() {
        const filePath = "../data/Profilepic.jpg";
        await this.mouseHover(this.selectors.userProfileUploadInput, "Upload");
        await this.uploadFile(this.selectors.userProfileUploadInput, filePath);
    }

    async updateUser() {
        await this.validateElementVisibility(this.selectors.updateButton, "Update");
        await this.click(this.selectors.updateButton, "Update", "Button");
        await this.wait('minWait');
    }

    async verifyUserCreationSuccessMessage() {
        await this.verification(this.selectors.successMessage, "successfully");
    }

}
