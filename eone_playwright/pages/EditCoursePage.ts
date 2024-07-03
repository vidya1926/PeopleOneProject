import { FakerData, getCurrentDateFormatted } from "../utils/fakerUtils";
import { AdminHomePage } from "./AdminHomePage";
import { BrowserContext, Locator, Page } from "@playwright/test";

export class EditCoursePage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        closeBtn: "//button[text()='Close']",
        courseMenu: (menuName: string) => `//span//span[text()='${menuName}']`,
        tagMenu: "//span//span[text()='Tags']",
        completionCertificateMenu: "//span//span[text()='Completion Certificate']",
        tagsSearchField: "//input[@id='tags-search-field']",
        tagListItem: (tagName: string) => `//li[text()='${tagName}']`,
        okBtnTag: "(//button[text()='OK'])",
        okBtnCertificate: "(//button[text()='OK'])[2]",
        certificateSearchField: "#exp-search-certificate-field",
        certificateRadioBtn: (certificateName: string) => `(//div[text()='${certificateName}']/following::i)[1]`,
        addBtn: "//button[text()='Add']",
        tagsSuccesfully: "//div[@id='staticBackdrop' and contains(@class,'show')]//following::span[contains(text(),'successfully.')]",
        accessTab: `//span//span[text()='Access']`,
        learnerGroup: `(//div[@id='wrapper-course-group-access-learner-group-list']//button)[1]`,
        learnerGroupOption: `//footer/following::a[1]`,
        accessSetting: `//span[@id='crs-accset-attr']//span[text()='Access Setting']`,
        optionalGroup: `(//div[@id='lms-scroll-learner-list']//following::div[@class='filter-option-inner'])[1]`,
        setMandatory: `//footer/following::span[text()='Mandatory']`,
        registrationEnd: `//input[@id='registration-ends-input']`,
        learnerGropSearch: `//div[@class='dropdown-menu show']//input`,
        timeZone: `//label[text()='Time Zone']/following-sibling::div//input`,
        timeZoneOption: `(//label[text()='Time Zone']/following::div//input[@placeholder='Search'])[1]`,
        indianTimezone: `//li[contains(text(),'Indian Standard Time/Kolkata')]`,
        startDateInstance:`//label[text()='Start Date']/following-sibling::div/input`,
        host:`//label[text()='Host']/following-sibling::div`,
    //    searchHost -->dd is not working in UI -->bug      
        otherMeeting:`//label[text()='Session Type']/following::div//span[text()='other Meetings']`,
        attendeeUrl:`//label[text()='Attendee URL']/following-sibling::input`,
        presenterUrl:`//label[text()='Presenter URL']/following-sibling::input`,
        addDeleteIcon: `//label[text()='session add/delete']/following::i[contains(@class,'fad fa-plus')]`
        
        //`(//label[text()='session add/delete']/following::div//i)[2]`
 
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
        await this.keyboardAction(this.selectors.tagsSearchField, "Backspace", "Search Field", randomTag)
        await this.click(`//li[text()='${randomTag}']`, randomTag, "Button")
        await this.validateElementVisibility(this.selectors.tagsSuccesfully, "Tags")
        await this.verification(this.selectors.tagsSuccesfully, "Tag has been added successfully.")
        await this.click(this.selectors.okBtnTag, "OK", "Button");
    }

    async selectCourseCompletionCertificate(certificateName: string) {
        await this.typeAndEnter(this.selectors.certificateSearchField, "Search", certificateName);
        const certSelector = this.selectors.certificateRadioBtn(certificateName);
        await this.click(certSelector, "Certificate", "Radio button");
        await this.click(this.selectors.addBtn, "Add", "Button");
        await this.click(this.selectors.okBtnCertificate, "OK", "Button");
    }



    async clickAccesstab() {
        await this.wait("minWait")

        await this.click(this.selectors.accessTab, "Access", "Button")
    }

    async addLearnerGroup() {
        await this.click(this.selectors.learnerGroup, "LearnerGroup", "Dropdown")
        await this.type(this.selectors.learnerGropSearch, "LG", "Option")
        await this.click(this.selectors.learnerGroupOption, "LG", "Option")
        await this.click(this.selectors.closeBtn, "Close", "Button")
    }

    async clickAccessSetting() {
        await this.click(this.selectors.accessSetting, "Access Setting", "Button")
    }

    async setCourseMandatory() {
        await this.click(this.selectors.optionalGroup, "Group Access", "dropdown")
        await this.click(this.selectors.setMandatory, "Mandatory", "Option")
    }


    async selectTimeZone(country: string) {
        await this.click(this.selectors.timeZone, "TimeZone", "Text Field")
        await this.type(this.selectors.timeZoneOption, "Time Zone", country)
        await this.mouseHover(this.selectors.indianTimezone, "Indian Time zone")
        await this.click(this.selectors.indianTimezone, "Indian Timezone", "Selected")
    }
    
    

   
}
