import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Page } from "@playwright/test";
import fs from 'fs'
import path from "path";


export class MetaLibraryPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        metadataLibraryLabel: "//h1[text()='metadata library']",
        categorySearchField: "//input[@id='category-search-field']",
        addCategoryBtn: "//button[text()='Add Category']",
        addDepartmentBtn: "//button[text()='Add Department']",
        categoryNameInput: "//input[@id='data_name']",
        categoryDescriptionInput: "//div[contains(@id,'data_description')]//p",
        saveBtn: "//button[text()='Save']",
        categoryVerification: (data: string) => `//div[contains(@class,'lms-cate-data')]/span[text()='${data}']`,
        providerExpandBtn: "//div[@id='provider-header']",
        addProviderBtn: "//button[text()='Add Provider']",
        providerSearchField: "//input[@id='provider-search-field']",
        providerVerification: (data: string) => `//span[text()='${data}']`,
        ceuProviderExpandBtn: "//div[@id='ceu-provider-header']",
        addCEUProviderBtn: "//button[text()='Add CEU Provider']",
        ceuProviderSearchField: "//input[@id='ceuprovider-search-field']",
        ceuProviderVerification: (data: string) => `//div[@id='ceu-provider-header']//following::span[text()='${data}']`,
        ceuTypeExpandBtn: "//div[@id='ceu-type-header']",
        addCEUTypeBtn: "//button[text()='Add CEU Type']",
        ceuTypeSearchField: "//input[@id='ceutypeprovider-search-field']",
        ceuTypeVerification: (data: string) => `//div[@id='ceu-type-header']/following::span[text()='${data}']`,
        tagsExpandBtn: "//div[@id='tag-header']",
        addTagsBtn: "//button[text()='Add Tag']",
        tagsSearchField: "//input[@id='tag-search-field']",
        tagsVerification: (data: string) => `//div[@id='tag-header']//following::span[text()='${data}']`,
        departmentSearchField: "//input[@id='department-search-field']",
        departmentVerification: (data: string) => `//div[@id='department-header']//following::span[text()='${data}']`,
        employmentTypeExpandBtn: "//div[@id='employment-header']",
        addEmploymentTypeBtn: "//button[text()='Add Employment Type']",
        employmentTypeSearchField: "//input[@id='employment-search-field']",
        employmentTypeVerification: (data: string) => `//div[@id='employment-header']//following::span[text()='${data}']`,
        userTypesExpandBtn: "//div[@id='usertypes-header']",
        addUserTypeBtn: "//button[text()='Add User Type']",
        userTypeSearchField: "//input[@id='usertypes-search-field']",
        userTypeVerification: (data: string) => `//div[@id='usertypes-header']//following::span[text()='${data}']`,
        jobRolesExpandBtn: "//div[@id='jobroles-header']",
        addJobRoleBtn: "//button[text()='Add Job Role']",
        jobRoleSearchField: "//input[@id='jobroles-search-field']",
        jobRoleVerification: (data: string) => `//div[@id='jobroles-header']//following::span[text()='${data}']`,
        jobTitleExpandBtn: "//div[@id='jobtitle-header']",
        addJobTitleBtn: "//button[text()='Add Job Title']",
        jobTitleSearchField: "//input[@id='jobtitle-search-field']",
        jobTitleVerification: (data: string) => `//div[@id='jobtitle-header']//following::span[text()='${data}']`,
        typeBtn: "(//label[text()='Type']//parent::div//button)[1]",
        cancellationTypes: (option: string) => `//span[text()='${option}']`,
        addAnotherPolicyButton: "//button[text()='Add Another Policy']",
        languageExpanBtn: "//div[@id='language-header']",
        languageCheckBox: `//div[contains(@id,'language')]//following::i[contains(@class,'fa-duotone fa-circle icon')]`,
        equipmentExpandBtn: `//div[@id='equipment-header']`,
        addEquipmentBtn: "//button[text()='Add Equipment']",
        equipmentname: "#data_name",
        equipmentSearchInput: "input#equipment-search-field",
        listOfPeopleDepartment: "div[id='department'] div[class$='content-start'] span",
        listOfPeopleEmployment: "div[id='employment'] div[class$='content-start'] span",
        listOfPeopleUsertypes: "div[id='usertypes'] div[class$='content-start'] span",
        listOfPeopleManager:"div[id='manager'] div[class$='content-start'] span",
        listOfPeopleJobtitle: "div[id='jobtitle'] div[class^='lms-cate-data']  span",
        listOfPeopleJobroles: "div[id='jobroles'] div[class^='lms-cate-data']  span",
        listofCEUType: "div[id='ceu-type'] div[class$='content-start'] span",
        listofCEUProvider: "div[id='ceu-provider'] div[class$='content-start'] span",
       

   };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }


    async verify_MetaDataLibrary_Label() {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.metadataLibraryLabel, "Metadata Library");
    }

    async categorySearchfield(data: string) {
        await this.type(this.selectors.categorySearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.categorySearchField, "Enter", "Search Field", data);
    }

    async addCategory() {
        await this.validateElementVisibility(this.selectors.addCategoryBtn, "Add Category");
        await this.click(this.selectors.addCategoryBtn, "Add Category", "Button");
    }

    async addDepartment() {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.addDepartmentBtn, "Add Department");
        await this.mouseHover(this.selectors.addDepartmentBtn, "Add Department");
        await this.click(this.selectors.addDepartmentBtn, "Add Department", "Button");
    }

    async name(data: string) {
        await this.type(this.selectors.categoryNameInput, "Name", data);
        await this.wait('minWait');
    }

    async description(data: string) {
        await this.type(this.selectors.categoryDescriptionInput, "Description", data);
    }

    async saveButton() {
        await this.validateElementVisibility(this.selectors.saveBtn, "Save");
        await this.mouseHover(this.selectors.saveBtn, "Save");
        await this.click(this.selectors.saveBtn, "Save", "Button");
        await this.spinnerDisappear();
    }

    async verifyCategory(data: string) {
        await this.verification(this.selectors.categoryVerification(data), data);
    }

    async providerExpandButton() {
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.providerExpandBtn, "Provider");
        await this.click(this.selectors.providerExpandBtn, "Provider", "Expand Button");
    }

    async addProvider() {
        await this.validateElementVisibility(this.selectors.addProviderBtn, "Add Provider");
        await this.click(this.selectors.addProviderBtn, "Add Provider", "Button");
    }

    async providerSearchField(data: string) {
        await this.type(this.selectors.providerSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.providerSearchField, "Enter", "Search Field", data);
    }

    async verifyProvider(data: string) {
        await this.verification(this.selectors.providerVerification(data), data);
    }

    async CEU_ProviderExpandButton() {
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.ceuProviderExpandBtn, "CEU Provider");
        await this.click(this.selectors.ceuProviderExpandBtn, "CEU Provider", "Expand Button");
    }

    async add_CEU_Provider() {
        await this.validateElementVisibility(this.selectors.addCEUProviderBtn, "Add CEU Provider");
        await this.click(this.selectors.addCEUProviderBtn, "Add CEU Provider", "Button");
    }

    async ceuProviderSearchField(data: string) {
        await this.retrieveData(this.selectors.listofCEUProvider, '../data/peopleCEUProviderData.json')
        await this.type(this.selectors.ceuProviderSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.ceuProviderSearchField, "Enter", "Search Field", data);
    }

    async verifyceuProvider(data: string) {
        await this.verification(this.selectors.ceuProviderVerification(data), data);
    }

    async CEU_TypeExpandButton() {
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.ceuTypeExpandBtn, "CEU Type");
        await this.click(this.selectors.ceuTypeExpandBtn, "Provider", "Expand Button");
    }

    async addCEU_Type() {
        await this.validateElementVisibility(this.selectors.addCEUTypeBtn, "CEU Type");
        await this.click(this.selectors.addCEUTypeBtn, "CEU TYPE", "Button");
    }

    async ceuTypeSearchField(data: string) {
        await this.retrieveData(this.selectors.listofCEUType, "../data/peopleCEUData.json")
        await this.type(this.selectors.ceuTypeSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.ceuTypeSearchField, "Enter", "Search Field", data);
    }

    async verify_ceuType(data: string) {
        await this.verification(this.selectors.ceuTypeVerification(data), data);
    }

    async tagsExpandButton() {
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.tagsExpandBtn, "Tags");
        await this.click(this.selectors.tagsExpandBtn, "Tags", "Expand Button");
    }

    async addTags() {
        await this.validateElementVisibility(this.selectors.addTagsBtn, "Add Tags");
        await this.click(this.selectors.addTagsBtn, "Add Tags", "Button");
    }

    async tagsSearchField(data: string) {
        await this.type(this.selectors.tagsSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.tagsSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async verify_Tags(data: string) {
        await this.verification(this.selectors.tagsVerification(data), data);
    }


    async department_SearchField(data: string) {
        await this.retrieveData(this.selectors.listOfPeopleDepartment, "../data/peopleDepartmentData.json")
        await this.type(this.selectors.departmentSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.departmentSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async verify_Department(data: string) {
        await this.spinnerDisappear();
        await this.verification(this.selectors.departmentVerification(data), data);
    }

    async employmentTypeExpandButton() {
        await this.mouseHover(this.selectors.employmentTypeExpandBtn, "Employment Type");
        await this.click(this.selectors.employmentTypeExpandBtn, "Employment Type", "Button");
    }

    async addEmploymentTypeButton() {
        await this.validateElementVisibility(this.selectors.addEmploymentTypeBtn, "Add Employment Type");
        await this.click(this.selectors.addEmploymentTypeBtn, "Add Employment Type", "Button");
    }

    async addEmploymentType_SearchButton(data: string) {
        await this.retrieveData(this.selectors.listOfPeopleEmployment, '../data/peopleEmploymentData.json')
        await this.type(this.selectors.employmentTypeSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.employmentTypeSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async verify_addEmploymentType(data: string) {
        await this.verification(this.selectors.employmentTypeVerification(data), data);
    }

    async userTypesExpandButton() {
        await this.mouseHover(this.selectors.userTypesExpandBtn, "Employment Type");
        await this.click(this.selectors.userTypesExpandBtn, "Employment Type", "Button");
    }

    async addUserTypeButton() {
        await this.validateElementVisibility(this.selectors.addUserTypeBtn, "Add Employment Type");
        await this.click(this.selectors.addUserTypeBtn, "Add Employment Type", "Button");
    }

    async userType_SearchButton(data: string) {
        await this.retrieveData(this.selectors.listOfPeopleUsertypes, "../data/peopleUserTypeData.json");
        await this.type(this.selectors.userTypeSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.userTypeSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async verify_UserType(data: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.userTypeVerification(data), data);
    }

    async jobRolesExpandButton() {
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.jobRolesExpandBtn, "Job Roles");
        await this.click(this.selectors.jobRolesExpandBtn, "Job Roles", "Button");
    }

    async addJobRole() {
        await this.validateElementVisibility(this.selectors.addJobRoleBtn, "Add Role Job");
        await this.click(this.selectors.addJobRoleBtn, "Add Role Job", "Button");
    }

    async addJobRole_SearchField(data: string) {
        await this.retrieveData(this.selectors.listOfPeopleJobroles, "../data/peopleJobRoles.json");
        await this.type(this.selectors.jobRoleSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.jobRoleSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async verify_JobRole(data: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.jobRoleVerification(data), data);
    }

    async jobTitleExpandButton() {
        await this.validateElementVisibility(this.selectors.jobTitleExpandBtn, "Job Title");
        await this.wait('minWait');
        await this.mouseHover(this.selectors.jobTitleExpandBtn, "Job Title");
        await this.click(this.selectors.jobTitleExpandBtn, "Job Title", "Button");
    }

    async addJobTitle_Button() {
        await this.click(this.selectors.addJobTitleBtn, "Add Job Title", "Button");
    }

    async jobtitle_SearchField(data: string) {
        await this.retrieveData(this.selectors.listOfPeopleJobtitle, "../data/peopleJobtitle.json");
        await this.type(this.selectors.jobTitleSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.jobTitleSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
    }

    async retrieveData(locator: string, filepath: string) {
        const length = await this.page.locator(locator).count();
        const data: string[] = [];

        for (let i = 0; i < length; i++) {
            const personData = await this.page.locator(locator).nth(i).innerText();
            if (personData) {
                data.push(personData.trim());
            }
        }
        fs.writeFileSync(path.join(__dirname, filepath), JSON.stringify(data, null, 2));
    }



    async verify_JobTitile(data: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.jobTitleVerification(data), data);
    }

    public async clickOnTypeAndSelectType(option: "E-Learning" | "Classroom" | "Virtual Class" | "Learning Path" | "Certification") {
        await this.mouseHover(this.selectors.typeBtn, "Type");
        await this.click(this.selectors.typeBtn, "Type", "Button");
        switch (option) {
            case "E-Learning":
                await this.click(this.selectors.cancellationTypes("E-Learning"), "E-Learning", "Dropdown");
                break;
            case "Certification":
                await this.click(this.selectors.cancellationTypes("Certification"), "E-Learning", "Dropdown");
                break;
            case "Classroom":
                await this.click(this.selectors.cancellationTypes("Classroom"), "E-Learning", "Dropdown");
                break;
            case "Learning Path":
                await this.click(this.selectors.cancellationTypes("Learning Path"), "E-Learning", "Dropdown");
                break;
            case "Virtual Class":
                await this.click(this.selectors.cancellationTypes("Virtual Class"), "E-Learning", "Dropdown");
                break;
        }
    }

    public async clickAddAnotherPolicy() {
        await this.mouseHover(this.selectors.addAnotherPolicyButton, "Add Another Policy");
        await this.click(this.selectors.addAnotherPolicyButton, "Add Another Policy", "Button");
    }

    public async clickLanuageExpandButton() {
        await this.validateElementVisibility(this.selectors.languageExpanBtn, "Language");
        await this.click(this.selectors.languageExpanBtn, "Language", "Button");
    }

    public async clickCheckBox() {
        const checkboxes = await this.page.$$(this.selectors.languageCheckBox);
        if (checkboxes.length === 0) {
            console.log('No checkboxes found.');
            return;
        }
        while (checkboxes.length > 0) {
            const randomIndex = Math.floor(Math.random() * checkboxes.length);
            const randomCheckbox = checkboxes[randomIndex];
            const isDisabled = await randomCheckbox.evaluate((el) => el.hasAttribute('disabled'));
            if (!isDisabled) {
                await randomCheckbox.hover();
                await randomCheckbox.click();
                await this.spinnerDisappear();
                console.log('Clicked a checkbox.');
                break;
            } else {
                checkboxes.splice(randomIndex, 1);
                console.log('Found a disabled checkbox, trying another.');
            }
        }
        if (checkboxes.length === 0) {
            console.log('All checkboxes are disabled.');
        }

    }

    public async clickEquipmentButton() {
        await this.validateElementVisibility(this.selectors.equipmentExpandBtn, "Equipment");
        await this.click(this.selectors.equipmentExpandBtn, "Equipment", "Button");
    }
    public async equipmentExpandButton() {
        await this.validateElementVisibility(this.selectors.equipmentExpandBtn, "Equipment");
        await this.click(this.selectors.equipmentExpandBtn, "Equipment", "Button");
    }

    public async clickAddEquipment() {
        await this.click(this.selectors.addEquipmentBtn, "Add Equipment", "Button");
    }

    public async enterEquipmentName(data: string) {
        await this.validateElementVisibility(this.selectors.equipmentname, "Name");
        await this.type(this.selectors.equipmentname, "Name", data)
    }

    public async verifyEquipment(data: string) {
        await this.typeAndEnter(this.selectors.equipmentSearchInput, "Search Input", data)
        await this.spinnerDisappear();
    }


}
