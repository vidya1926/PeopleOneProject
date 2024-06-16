import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Page } from "@playwright/test";

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
        jobTitleVerification: (data: string) => `//div[@id='jobtitle-header']//following::span[text()='${data}']`
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
    }

    async verify_Tags(data: string) {
        await this.verification(this.selectors.tagsVerification(data), data);
    }

    async department_SearchField(data: string) {
        await this.type(this.selectors.departmentSearchField, "Search Field", data);
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
        await this.type(this.selectors.employmentTypeSearchField, "Search Field", data);
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
        await this.type(this.selectors.userTypeSearchField, "Search Field", data);
    }

    async verify_UserType(data: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.userTypeVerification(data), data);
    }

    async jobRolesExpandButton() {
        await this.click(this.selectors.jobRolesExpandBtn, "Job Roles", "Button");
    }

    async addJobRole() {
        await this.validateElementVisibility(this.selectors.addJobRoleBtn, "Add Role Job");
        await this.click(this.selectors.addJobRoleBtn, "Add Role Job", "Button");
    }

    async addJobRole_SearchField(data: string) {
        await this.type(this.selectors.jobRoleSearchField, "Search Field", data);
    }

    async verify_JobRole(data: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.jobRoleVerification(data), data);
    }

    async jobTitleExpandButton() {
        await this.click(this.selectors.jobTitleExpandBtn, "Job Title", "Button");
    }

    async addJobTitle_Button() {
        await this.click(this.selectors.addJobTitleBtn, "Add Job Title", "Button");
    }

    async jobtitle_SearchField(data: string) {
        await this.type(this.selectors.jobTitleSearchField, "Search Field", data);
    }

    async verify_JobTitile(data: string) {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.jobTitleVerification(data), data);
    }
}
