import { getCurrentDateFormatted } from "../utils/fakerUtils";
import { getRandomItemFromFile } from "../utils/jsonDataHandler";
import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Page } from "@playwright/test";

export class UserPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        createUserbtn:`//button[text()='CREATE USER']`,
      //  createUserLabel: "//h1[text()='Create User']",
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
        commonOptionBtn:(value:string,data:string)=>`(//div[@id='user-${value}-filter-lms-scroll-results']//li)[1]`,
        departmentType:`//label[text()='department']/following::div[@id='user-department']//input`,
        timeZone:`(//div[@id='wrapper-user-timezone']//button)[1]`,
        timeZoneSearch:`//footer/following-sibling::div//input`,
        selectlocationtz:(index:number,timeZone:string)=>`(//li/a/span[contains(text(),'${timeZone}')])[${index}]`,
        hireDate:`//input[@id='user-hiredate-input']`,
        userType:`//input[@id='user-usertype-filter-field']`,
        jobtitle:`//input[@id='user-jobtitle-filter-field']`,
        manager:`//input[@id='user-manager-filter-field']`,
        othermanager:`//input[@id='user-other-managers-filter-field']`,
        searchOtherManager:`//div[@id='user-other-managers']`,
        otherMgrOption:(index:number)=>`(//div[@id='user-other-managers']/following::li)[${index}]`,
        language:`//label[contains(text(),'Language')]/following::div[@id='wrapper-user-language']`,
        searchLanguage:`//footer/following::div/input`,
        courseLanguageLink: (language: string) => `//label[text()='Language']//following::span[text()='${language}']`,

    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async verifyCreateUserLabel(expectedLabel: string) {
        await this.verification(this.selectors.createUserbtn, expectedLabel);
    }
    
    async clickCreateUser() {
        await this.click(this.selectors.createUserbtn, "Create User", "Button");
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
    async selectDepartmentType(dpmtType:string){
        let data =getRandomItemFromFile("../data/peopleDepartmentData.json");
        await this.typeAndEnter(this.selectors.departmentType,"Department Type",data)
        await this.mouseHover(this.selectors.commonOptionBtn(dpmtType,data),data);
        await this.click(this.selectors.commonOptionBtn(dpmtType,data),data,"List");
    }

    async selectUserType(userType:string){
        let data =getRandomItemFromFile("../data/peopleUserTypeData.json");
        await this.typeAndEnter(this.selectors.userType,"User Type",data)
        await this.mouseHover(this.selectors.commonOptionBtn(userType,data),data);
        await this.click(this.selectors.commonOptionBtn(userType,data),data,"List");
    }
    async selectManager(manager:string){
        let data =getRandomItemFromFile("../data/peopleDirectManager.json");
        await this.typeAndEnter(this.selectors.manager,"User Type",data)
        await this.mouseHover(this.selectors.commonOptionBtn(manager,data),data);
        await this.click(this.selectors.commonOptionBtn(manager,data),data,"List");
    }

    async selectOtherManager(){
      //  let data =getRandomItemFromFile("../data/peopleOtherManager.json");
        await this.click(this.selectors.othermanager,"OtherManager","input field")
    //    await this.typeAndEnter(this.selectors.searchOtherManager,"OtherManagers",data)
        const count=await this.page.locator("//div[@id='user-other-managers']/following::li").count();
        const randomIndex = Math.floor(Math.random() * count) + 1;
        await this.mouseHover(this.selectors.otherMgrOption(randomIndex),"OtherManager");
        await this.click(this.selectors.otherMgrOption(randomIndex),"OtherManager","List");
    }

    async selectLanguage(language: string) {
        await this.click(this.selectors.language, "Language", "Field");
        await this.type(this.selectors.searchLanguage, "Input Field", language);
        await this.mouseHover(this.selectors.courseLanguageLink(language), language);
        await this.click(this.selectors.courseLanguageLink(language), language, "Button");

    }


    
    async selectjobTitle(jobTitle:string){
        let data =getRandomItemFromFile("../data/peopleJobtitle.json");
        await this.typeAndEnter(this.selectors.jobtitle,"User Type",data)
        await this.mouseHover(this.selectors.commonOptionBtn(jobTitle,data),data);
        await this.click(this.selectors.commonOptionBtn(jobTitle,data),data,"List");
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

    async selectTimeZone(data:string,timeStd:string){
        await this.validateElementVisibility(this.selectors.timeZone,"TimeZone")
        await this.click(this.selectors.timeZone,"TimeZone","Input")
        await this.keyboardType(this.selectors.timeZoneSearch,data,)
      const index=  await this.page.locator(`//li/a/span[contains(text(),'${timeStd}')]`).count();
      const randomIndex = Math.floor(Math.random() * index)+1;
        await this.mouseHover(this.selectors.selectlocationtz(randomIndex,timeStd),"TimeZone")
        await this.click(this.selectors.selectlocationtz(randomIndex,timeStd),"TimeZone","Option")

    }

    public async enterHireDate(){
        await this.keyboardType(this.selectors.hireDate,getCurrentDateFormatted())
    }


}
