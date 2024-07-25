import { Page, BrowserContext } from "@playwright/test";

import { LearnerHomePage } from "./LearnerHomePage";
import { da } from "@faker-js/faker";
import { time } from "console";
import { stat } from "fs";
import { FakerData } from "../utils/fakerUtils";

export class ProfilePage extends LearnerHomePage {
    public selectors = {
        ...this.selectors,
        profileSettings: "(//div[@id='accountsetttings'])[1]",
        profileDetailsTab: "//a[text()='Details']",
        skillTab: "(//h5[text()='Skills']/following-sibling::i[contains(@class, 'fa-pencil')])[1]",
        nameDetails: "//h5[text()='Name and Details']/following::i[1]",
        addIcon: "//span[text()='Add']",
        skillNameField: "//label[text()='Skills']/following::input[@id='skill_name']",
        proficiencyField: "//label[text()='Proficiency']/following::input[@id='proficiency']",
        showToAllSkills: "//span[text()='Show To All']",
        saveskills: "//button[text()='Save']",
        verifySkills: "//span[contains(text(),'saved')]",
        imgUpload: "//div//input[@id='userfiles']",
        confirmUpload: `//button[@id='cropSubmit']`,
        // saveNameDetails: "//button[text()='Save']",
        preference: "//a[text()='preferences']",
        preferenceTimeZone: "//div[@id='wrapper-lnr_timezone']",
        TimeZoneSearch: "//label[text()='TimeZone']/following::input[1]",
        oneProfile: "//a[text()='ONE-Profile']",
        oneProfileClick: "(//a[text()='Click Here'])[1]",
        oneProfilePage: "//h1[text()='One-Profile CEU Summary']",
        timezoneOptions: (option: string) => `//span[text()='${option}']`,
        PreferenceLanguagesWrapper: "//label[text()='Language']/following::div[@id='wrapper-lnr_languages']",
        PreferenceLanguageInput: `//label[text()='Language']/following::input[1]`,
        PreferenceLanguage: (Language: string) => `//li[@class='selected active']//following::span[text()='${Language}']`,
        PreferenceCurrency: "//label[text()='Currency']/following::div[@id='wrapper-lnr_currency']",
        PreferenceCurrencyInput: "//label[text()='Currency']/following::input[1]",
        PreferenceCurrencyOption: (Option: string) => `//span[text()='${Option}']`,
        PreferenceCountry: "//label[text()='Country']/following::div[@id='wrapper-lnr_country']",
        PreferenceCountryInput: "//label[text()='Country']/following::input[1]",
        PreferenceCountryOption: (Option: string) => `//span[text()='${Option}']`,
        PreferenceStateOption: (Option: string) => `//span[text()='${Option}']`,
        PreferenceState: "//label[text()='Country']/following::div[@id='wrapper-lnr_state']",
        PreferenceStateInput: "//label[text()='State/Province']/following::input[1]",
        City: `//label[text()='City']/following::input[1]`,
        PreferenceDateFormat: "//label[text()='Date Format']/following::div[@id='wrapper-date_format']",
        PreferenceDateFormatInput: "//label[text()='Date Format']/following::input[1]",
        PreferenceDateFormatOption: (Option: string) => `//span[text()='${Option}']`,
        PreferenceDetailsPage: "//label[text()='Details page view']/following::div[@id='wrapper-details_page']",
        PreferenceDetailsPageInput: "//label[text()='Details page view']/following::input[1]",
        PreferenceDetailsPageOption: (Option: string) => `//span[text()='${Option}']`,
        PreferenceCreditPeriod: "//label[text()='Credit Period']/following::div[@id='wrapper-credit_period']",

        PreferenceCreditPeriodOption: (Option: string) => `(//span[text()=${Option}])[1]`,
        CreditScore: "//label[text()='Target Credit']/following::input[1]",
        //PreferenceCreditPeriod:"//label[text()='Credit Period']/following::div[@id='wrapper-credit_period']",
        PreferenceAddress1: "//input[@id='address1']",
        PreferenceAddress2: "//input[@id='address2']",
        PreferenceZipcode: "//input[@id='zipcode']",
        PreferenceMobile: "//input[@id='mobile_number']",
        PreferencePhone: "//input[@id='phone_number']",
        PreferenceDepartment: "//label[text()='Department']/following::div[@id='wrapper-department']",
        PreferenceDepartmentInput: "//label[text()='Department']/following::input[1]",
        PreferenceDepartmentOption: (Option: string) => `//span[text()='${Option}']`,
        PreferenceEmployeeId: "//label[text()='Employee Id']/following::input[@id='target_credit']",
        PreferenceEmployeeType: "//label[text()='Employee Type']/following::div[@id='wrapper-employee_type']",

        PreferenceEmployeeTypeInput: "//label[text()='Employee Type']/following::input[1]",
        PreferenceEmployeeTypeOptions: (Option: string) => `//span[text()='${Option}']`,
        PreferenceJobRole: "//label[text()='Job Role']/following::div[@id='wrapper-job_role']",
        PreferenceJobRoleInput: "//label[text()='Job Role']/following::input[1]",
        PreferenceJobRoleOptions: (Option: string) => `//span[text()='${Option}']`,
        PreferenceJobTitle: "//label[text()='Job Title']/following::div[@id='wrapper-job_title']",
        PreferenceJobtitleInput: "//label[text()='Job Title']/following::input[1]",
        PreferenceJobtitleOptions: (Option: string) => `//span[text()='${Option}']`,
        PreferenceOrganization: "//label[text()='Organization']/following::div[@id='wrapper-organization']",
        PreferenceOrganizationInput: "//label[text()='Organization']/following::input[1]",
        PreferenceOrganiationOptions: (Option: string) => `//span[text()='${Option}']`,
        PreferenceUserType: "//label[text()='User Type']/following::div[@id='wrapper-user_type']",
        PreferenceUserTypeInput: "//label[text()='User Type']/following::input[1]",
        PreferenceUserTypeOptions: (Option: string) => `//span[text()='${Option}']`,
        PreferenceCreditTypeInput: "//label[text()='Credit Period']/following::input[1]",
        saveButton: "//button[text()='Save']",

        Language: "//select[@id='lnr_languages']/option",
        Currency: " //select[@id='lnr_currency']/option",
        Country: " //select[@id='lnr_country']/option",
        State: " //select[@id='lnr_state']/option",
        date: " //select[@id='date_format']/option",
        Details: "//select[@id='details_page']/option",
        Department: "//select[@id='department']/option",
        EmployeeType: "//select[@id='employee_type']/option",
        JobRole: "//select[@id='job_role']/option",
        JobTitle: "//select[@id='job_title']/option",
        Organization: "//select[@id='organization']/option",
        UserType: "//select[@id='user_type']/option",
        oneProfileInfo: (data:string)=> `(//div[contains(@class,'start justify-content-start')]//div[contains(text(),'${data}: ')])[1]`


    }
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    async clickProfile() {
        await this.validateElementVisibility(this.selectors.profileSettings, "profile")
        await this.click(this.selectors.profileSettings, "ProfileIMG", "IMG")
    }
    async detailsTab() {
        await this.click(this.selectors.profileDetailsTab, "details", "tab")
    }
    async preferenceTab() {
        await this.click(this.selectors.preference, "preference", "tab")
    }

    async preferenceTimeZone(timezone: string) {
        await this.click(this.selectors.preferenceTimeZone, "timezone", "dropdown")
        await this.type(this.selectors.TimeZoneSearch, "dropdown", timezone)
        await this.mouseHover(this.selectors.timezoneOptions(timezone), timezone);
        //await this.waitForSelector(this.selectors.timezoneOptions(timezone))
        await this.click(this.selectors.timezoneOptions(timezone), "dropdownOptions", "button")
    }
    async selectLanguage() {
        const Languages = await this.page.$$(this.selectors.Language);
        const randomIndex = Math.floor(Math.random() * Languages.length);
        const randomElement = Languages[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceLanguagesWrapper, "Language", "Field");
        await this.type(this.selectors.PreferenceLanguageInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceLanguage(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceLanguage(trimmedRandomOption), trimmedRandomOption, "Button");

    }
    async selectCurrency() {
        const Currency = await this.page.$$(this.selectors.Currency);
        const randomIndex = Math.floor(Math.random() * Currency.length);
        const randomElement = Currency[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceCurrency, "Language", "Field");
        await this.type(this.selectors.PreferenceCurrencyInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceCurrencyOption(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceCurrencyOption(trimmedRandomOption), trimmedRandomOption, "Button");

    }
    async selectCountry() {
        const Country = await this.page.$$(this.selectors.Country);
        const randomIndex = Math.floor(Math.random() * Country.length);
        const randomElement = Country[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceCountry, "Language", "Field");
        await this.type(this.selectors.PreferenceCountryInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceCountryOption(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceCountryOption(trimmedRandomOption), trimmedRandomOption, "Button");

    }
    async selectState() {
        const state = await this.page.$$(this.selectors.State);
        const randomIndex = Math.floor(Math.random() * state.length);
        const randomElement = state[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions || '';
        await this.click(this.selectors.PreferenceState, "Language", "Field");
        await this.type(this.selectors.PreferenceStateInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceStateOption(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceStateOption(trimmedRandomOption), trimmedRandomOption, "Button");

    }
    async city(City: string) {
        await this.type(this.selectors.City, "City", City)
    }
    async address1(address: string) {
        await this.type(this.selectors.PreferenceAddress1, "Address1", address);
    }
    async address2(address: string) {
        await this.type(this.selectors.PreferenceAddress2, "Address2", address);
    }
    async zipcode(zipcode: string) {
        await this.type(this.selectors.PreferenceZipcode, "Zipcode", zipcode);
    }
    async mobile(mobileNumber: string) {
        await this.type(this.selectors.PreferenceMobile, "Mobile", mobileNumber);
    }
    async phone(phoneNumber: string) {
        await this.type(this.selectors.PreferencePhone, "Phone", phoneNumber);
    }
    async employeeId(employeeId: string) {
        await this.type(this.selectors.PreferenceEmployeeId, "Employee Id", employeeId);
    }

    async selectDateFormat() {
        const date = await this.page.$$(this.selectors.date);
        const randomIndex = Math.floor(Math.random() * date.length);
        const randomElement = date[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceDateFormat, "DateFormat", "Field");
        await this.type(this.selectors.PreferenceDateFormatInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceDateFormatOption(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceDateFormatOption(trimmedRandomOption), trimmedRandomOption, "Button");

    }
    async selectDetailsPage() {
        const Details = await this.page.$$(this.selectors.Details);
        const randomIndex = Math.floor(Math.random() * Details.length);
        const randomElement = Details[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceDetailsPage, "DateFormat", "Field");
        await this.type(this.selectors.PreferenceDetailsPageInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceDetailsPageOption(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceDetailsPageOption(trimmedRandomOption), trimmedRandomOption, "Button");

    }


    async selectDepartment() {
        const Department = await this.page.$$(this.selectors.Department);
        const randomIndex = Math.floor(Math.random() * Department.length);
        const randomElement = Department[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceDepartment, "Department", "Field");
        await this.type(this.selectors.PreferenceDepartmentInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceDepartmentOption(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceDepartmentOption(trimmedRandomOption), trimmedRandomOption, "Button");
    }
    async selectEmployeeType() {
        const EmployeeType = await this.page.$$(this.selectors.EmployeeType);
        const randomIndex = Math.floor(Math.random() * EmployeeType.length);
        const randomElement = EmployeeType[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceEmployeeType, "Employee Type", "Field");
        await this.type(this.selectors.PreferenceEmployeeTypeInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceEmployeeTypeOptions(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceEmployeeTypeOptions(trimmedRandomOption), trimmedRandomOption, "Button");
    }
    async selectJobRole() {
        const JobRole = await this.page.$$(this.selectors.JobRole);
        const randomIndex = Math.floor(Math.random() * JobRole.length);
        const randomElement = JobRole[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceJobRole, "Job Role", "Field");
        await this.type(this.selectors.PreferenceJobRoleInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceJobRoleOptions(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceJobRoleOptions(trimmedRandomOption), trimmedRandomOption, "Button");
    }
    async selectJobTitle() {
        const JobTitle = await this.page.$$(this.selectors.JobTitle);
        const randomIndex = Math.floor(Math.random() * JobTitle.length);
        const randomElement = JobTitle[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceJobTitle, "Job Title", "Field");
        await this.type(this.selectors.PreferenceJobtitleInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceJobtitleOptions(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceJobtitleOptions(trimmedRandomOption), trimmedRandomOption, "Button");
    }
    async selectOrganization() {
        const organization = await this.page.$$(this.selectors.Organization);
        const randomIndex = Math.floor(Math.random() * organization.length);
        const randomElement = organization[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceOrganization, "Organization", "Field");
        await this.type(this.selectors.PreferenceOrganizationInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceOrganiationOptions(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceOrganiationOptions(trimmedRandomOption), trimmedRandomOption, "Button");
    }
    async selectUserType() {
        const UserType = await this.page.$$(this.selectors.UserType);
        const randomIndex = Math.floor(Math.random() * UserType.length);
        const randomElement = UserType[randomIndex].textContent();
        const randomOptions = await randomElement
        const trimmedRandomOption: string = randomOptions?.trim() || '';
        await this.click(this.selectors.PreferenceUserType, "User Type", "Field");
        await this.type(this.selectors.PreferenceUserTypeInput, "Input Field", trimmedRandomOption);
        await this.type(this.selectors.PreferenceUserTypeInput, "Input Field", trimmedRandomOption);
        await this.mouseHover(this.selectors.PreferenceUserTypeOptions(trimmedRandomOption), trimmedRandomOption);
        await this.click(this.selectors.PreferenceUserTypeOptions(trimmedRandomOption), trimmedRandomOption, "Button");
    }


    async CreditPeriod(month: string) {
        await this.click(this.selectors.PreferenceCreditPeriod, "creditperiod", "dropdown")
        await this.type(this.selectors.PreferenceCreditTypeInput, "Input Field", month);
        await this.mouseHover(this.selectors.PreferenceCreditPeriodOption(month), month);
        await this.click(this.selectors.PreferenceCreditPeriodOption, "CreditPeriodOptions", "Button")
    }
    async CreditScore(creditScore: string) {
        await this.type(this.selectors.CreditScore, "CreditScore", creditScore)
    }

    async clickSave() {
        //await this.waitForl(this.selectors.clickSave)
        await this.validateElementVisibility(this.selectors.saveButton, "save")
        await this.click(this.selectors.saveButton, "save", "button")

    }

    async addSkills(Proficiency: string) {
        await this.click(this.selectors.skillTab, "skills", "button")
        await this.validateElementVisibility(this.selectors.addIcon, "skillNameField")
        await this.click(this.selectors.addIcon, "addskill", "button")
        await this.validateElementVisibility(this.selectors.skillNameField, "skillNameField")
        await this.type(this.selectors.skillNameField, "skillNameField", FakerData.getRandomSkill())
        await this.type(this.selectors.proficiencyField, "proficiencyField", Proficiency)
        await this.click(this.selectors.showToAllSkills, "showToAllSkills", "Checkbox")
        await this.click(this.selectors.saveButton, "Saveskills", "button")
        await this.validateElementVisibility(this.selectors.verifySkills, "verification message")

    }
    async addImg() {
        const path = "../data/Profilepic.jpg"
        await this.click(this.selectors.nameDetails, "nameoption", "button")
        await this.uploadFile(this.selectors.imgUpload, path)
        await this.validateElementVisibility(this.selectors.confirmUpload, "Upload")
        await this.click(this.selectors.confirmUpload, "Upload", "button")
        await this.click(this.selectors.showToAllSkills, "showToAllSkills", "Checkbox")
    }
    async oneProfile() {
        await this.click(this.selectors.oneProfile, "one-profile", "button")
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for the new page event
            this.click(this.selectors.oneProfileClick, "Click here", "link") // Click the link that opens the new tab
        ]);
        // Wait for the new page to load
        await newPage.waitForLoadState('load');
        await newPage.waitForSelector(this.selectors.oneProfilePage)
        const title = await newPage.title()
        console.log(title)
        if (title.includes("ONE")) {
            console.log("One-profile tab opened")
        }
        else {
            console.error("One-profile tab not opened")
        }

    }


     async verifyprofileInfo(data:string){
        const info=await this.getInnerText(this.selectors.oneProfileInfo(data))
        return info;
     }

}


