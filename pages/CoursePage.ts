import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import path from "path";
import fs from "fs";
import { FakerData, getCurrentDateFormatted, getRandomLocation, getRandomSeat } from "../utils/fakerUtils";
import { TIMEOUT } from "dns";
import { CompletionCertificationPage } from "./CompletionCertificationPage";


export class CoursePage extends AdminHomePage {
    public selectors = {
        ...this.selectors,
        createUserLabel: "//h1[text()='Create Course']",
        courseDescriptionInput: "//div[@id='course-description']//p",
        uploadDiv: "//div[@id='upload-div']",
        uploadInput: "//div[@id='upload-div']//input[@id='content_upload_file']",
        attachedContent: (fileName: string) => `//label[text()='Attached Content']/following::span/following-sibling::div[text()='${fileName}']`,
        showInCatalogBtn: "//span[text()='Show in Catalog']",
        modifyTheAccessBtn: "//footer/following::button[text()='No, modify the access']",
        saveBtn: "//button[@id='course-btn-save' and text()='Save']",
        proceedBtn: "//footer//following::button[contains(text(),'Yes, Proceed')]",
        successMessage: "//div[@id='lms-overall-container']//h3",
        domainBtn: "//label[text()='Domain']/following::button[1]",
        //  domainOption: (domain_name: string) => `//div[@class='dropdown-menu show']//span[text()='${domain_name}']`,
        closeBtn: "//button[text()='Close']",
        courseLanguagesWrapper: "//label[contains(text(),'Language')]/following::div[@id='wrapper-course-languages']",
        courseLanguageInput: "//label[text()='Language']/following::input[1]",
        courseLanguageLink: (language: string) => `//label[text()='Language']//following::span[text()='${language}']`,
        selectCategoryBtn: "//div[@id='new-course-categorys']//div[text()='Select']",
        categoryOption: (category: string) => `//span[text()='${category}']`,
        addCategoryBtn: "//div[text()='Add Category']",
        categoryInput: "//label[text()='Category']/following::input[@id='course-categorys']",
        //okBtn: "//button[text()='OK']",
        okBtn: "//span[contains(text(),'created successfully')]/following::button[text()='OK']",
        cancelBtn: "//label[text()='Category']/following::span[contains(@class,'lms-cat-cancel')]",
        providerDropdown: "(//label[text()='Provider']/following::button)[1]",
        providerOption: (provider: string) => `//a[@class='dropdown-item active']//span[text()='${provider}']`,
        totalDurationInput: "(//label[text()='Total Duration']/following::input)[1]",
        additionalInfoInput: "//div[@id='additional_information_description_id']//p",
        priceInput: "//label[text()='Price']/following::input[1]",
        currencyDropdown: "//div[@id='wrapper-course-currency']",
        currencyOption: "//label[text()='Currency']/following::a/span[text()='US Dollar']",
        maxSeatsInput: "//label[text()='Seats-Max']/following::input[1]",
        contactSupportInput: "//label[text()='Contact Support']/following::input[1]",
        complianceField: "//div[@id='wrapper-course-compliance']",
        complianceOption: "//footer/following-sibling::div//span[text()='Yes']",
        validityField: "//div[@id='wrapper-course-compliance-validity']",
        validityOption: "//footer/following::span[text()='Days']",
        validityDateInput: "input[@id='validity_date-input']",
        validityDaysInput: "//input[@id='validity_days']",
        completeByField: "//div[@id='wrapper-course-complete-by']",
        completeByDaysInput: "//input[@id='complete_days']",
        completeByRule: `(//div[@id='wrapper-course-complete-by-rule']//button)[1]`,
        completeByRuleOption: `//footer/following-sibling::div//span[text()='Yes']`,
        postCompleteByStatusField: "//div[@id='wrapper-course-post-complete-by-status']",
        postCompleteByOption: "//footer/following::a/span[text()='Overdue']",
        courseInstancesField: "//div[@id='wrapper-course-instances']",
        instanceTypeOption: "//span[text()='Multi Instance/Class']",
        hideInCatalogCheckbox: "//span[contains(text(),'Hide in Catalog')]",
        saveInDraftCheckbox: "//span[contains(text(),'Save as Draft')]",
        deliveryTypeDropdown: "//div[@id='wrapper-course-delivery-type']",
        deliveryTypeOption: (deliveryType: string) => `//span[text()='${deliveryType}']`,
        editCourseTabLink: "//a[text()='Edit Course']",
        addInstancesBtn: "//button[@id='course-btn-add-instances']",
        instanceDeliveryTypeField: "//div[@id='wrapper-instanceDeliveryType']",
        instanceDeliveryTypeOption: (delivery: string) => `//footer/following::a/span[text()='${delivery}']`,
        instanceCountInput: "//div[@id='exp-course-instances-options']//input",
        createInstanceBtn: "//button[@id='instance-add']",
        sessionNameInput: "//label[text()='Session Name']/following-sibling::input",
        sessionNameIndex: (index: number) => `(//label[text()='Session Name']/following-sibling::input)[${index}]`,

        instructorDropdown: "//label[text()='Instructor']/following-sibling::div//input",
        instructorDropdownIndex: (index: number) => `(//label[text()='Instructor']/following-sibling::div//input)[${index}]`,
        instructorOption: (instructorName: string) => `//li[contains(text(),'${instructorName}')]`,
        instructorOptionIndex: (instructorName: string, index: number) => `(//li[contains(text(),'${instructorName}')])[${index}]`,

        locationSelection: "//label[text()='Select Location']/following-sibling::div//input[1]",
        locationDropdown: "//label[text()='Select Location']/following-sibling::div//input[@placeholder='Search']",
        locationOption: (locationName: string) => `//li[text()='${locationName}']`,
        CourseCalendaricon: "(//label[text()='Complete by']/following::button[contains(@class,'calendaricon')]//i)[1]",
        tomorrowdate: "//td[@class='today day']/following-sibling::td[1]",
        nextMonth: `//div[@class='datepicker-days']//th[@class='next']`,
        calanderIcon: "(//label[text()='Date']//following::button[contains(@class,'calendaricon')])[1]",

        todayDate: "td[class='today day']",
        randomDate: `(//td[@class='day']/following-sibling::td)[1]`,
        seatMaxInput: "//label[text()='Seats-Max']/following-sibling::input",
        timeInput: `//label[text()='Start Time']/following-sibling::input`,
        chooseTimeOption: (randomIndex: string) => `(//div[contains(@class,'timepicker')]//li)[${randomIndex}]`,
        chooseStartTimeIndex: (index: string, randomIndex: number) => `((//ul[@class='ui-timepicker-list'])[${index}]/li)[${randomIndex}]`,
        waitlistInput: "//label[text()='Waitlist']/following-sibling::input",
        updateBtn: "//button[text()='Update']",
        detailsbtn: "//button[text()='Details']",
        courseUpdateBtn: "//button[@id='course-btn-save']",
        surveyAndAssessmentLink: "//button[text()='Survey/Assessment']",
        surveyCheckBox: "//div[@id='sur_ass-lms-scroll-survey-list']//i[contains(@class,'fa-duotone fa-square icon')]",
        editCourseBtn: "//a[text()='Edit Course']",
        assessmentCheckbox: "//div[@id='sur_ass-lms-scroll-assessment-list']//i[contains(@class,'fa-duotone fa-square icon')]",
        addAssessmentBtn: "//button[text()='Add As Assessment']",
        categoryDropdown: "//div[@class='dropdown-menu show']//input[@type='search']",
        allCategoryOptions: "//select[@id='course-categorys-exp-select']/option",
        providerOptions: "//select[@id='course-providers']/option",
        provider: (Options: string) => `(//span[text()='${Options}'])[1]`,
        progress: "//progress[@id='progress-bar'and@value='0']",
        addSurveyBtn: "//button[text()='Add As Survey']",
        deliveryLabel: "//label[text()='Delivery Type']",
        instructorInput: "//input[contains(@id,'instructors') and (@placeholder='Search')]",
        instructorInputIndex: (index: number) => `(//input[contains(@id,'instructors') and (@placeholder='Search')])[${index}]`,
        //instance_Class: "//a[contains(@title,'Instance/Class')]", -->DOM Contented Changed 08-07-2024
        instance_Class:"//a[contains(@title,'Instance Class') or contains(@aria-label,'Instance/Class')]",
        clickContentLibrary: "//span[text()='Add Content']//following::span[text()='Click here'][1]",
        allContents: "//i[@class='fa-duotone fa-square icon_16_1']",
        contentIndex: (index: number) => `(//i[contains(@class,'fa-duotone fa-square ico')])[${index}]`,
        addContentButton: "//button[text()='Add Content']",
        attachedContentLabel: "//label[text()='Attached Content']",
        getCourse: "//input[@id='course-title']",
        domainDropdown: "//a[@class='dropdown-item selected']",
        domainDropdownIndex: (domain_index: number) => `(//a[@class='dropdown-item selected'])[${domain_index}]`,
        domainSelectedText: "//div[contains(text(),'selected')]",
        domainOption: (domain_name: string) => `//div[@class='dropdown-menu show']//span[text()='${domain_name}']`,
        portalDropdown:`//button[@data-id='banner_portal_id']`,
        portalOption:(index:string)=>`(//label[text()='Domain']/following::div[@class='dropdown-menu show']//a)[${index}]`,
        image: "(//div[@class='img-wrapper']/img)[1]",
        clickHere: "//div[@class='form-label']/span",
        httpsInput: "input[id=content_url]",
        addURLBtn: "button:text-is('Add URL')",
        clickSaveasDraft: "//input[@id='draftcatalog']/parent::div//i[contains(@class,'fa-dot-circle')]",
        willResolveLaterBtn: "//footer//following::button[text()='No, will resolve later']",
        selectType: `//label[text()='Session Type']/following-sibling::div`,
        sessionType: "(//label[text()='Session Type']/parent::div//button)[1]",
        otherMeeting: "//span[text()='other Meetings']",
        sessionTypeIndex: (index: number) => `(//label[text()='Session Type']/following-sibling::div)[${index}]`,
        attendeeUrlIndex: (index: number) => `(//label[text()='Attendee URL']/following-sibling::input)[${index}]`,
        presenterUrlIndex: (index: number) => `(//label[text()='Presenter URL']/following-sibling::input)[${index}]`,
        timeZoneIndex: (timeZone: number) => `(//label[text()='Time Zone']/following-sibling::div//input)[${timeZone}]`,
        otherMeetingIndex: (othermeeting: number) => `(//label[text()='Session Type']/following::div//span[text()='other Meetings'])[${othermeeting}]`,
        timeZoneOption: `(//label[text()='Time Zone']/following::div//input[@placeholder='Search'])[1]`,
        //  timeZoneOptionIndex:(timeOption:number) =>`(//label[text()='Time Zone']/following::div//input[@placeholder='Search'])[${timeOption}]`,
        // indianTimezoneIndex:(timezoneIndia:number)=> `(//li[contains(text(),'Indian Standard Time/Kolkata')])[${timezoneIndia}]`,
        indianTimezone: `//li[contains(text(),'Indian Standard Time/Kolkata')]`,
        Date: "(//label[contains(text(),'Date')]/following-sibling::div/input)[1]",
        startDateInstanceIndex: (index: number) => `(//label[text()='Start Date']/following-sibling::div/input)[${index}]`,
        timeInputIndex: (index: number) => `(//label[text()='Start Time']/following-sibling::input)[${index}]`,
        addDeleteIcon: `//label[text()='session add/delete']/following::i[contains(@class,'fad fa-plus')]`,
        domainInnerValue: "//label[text()='Domain']/parent::div//div[@class='filter-option-inner']/div",
        completionCertificationlink: "//span[text()='Completion Certificate']",
        loadMoreBtn: "//div[contains(@id,'scroll-certificat')]//button[text()='Load More']",
        certificateCheckboxCount: "//div[contains(@id,'scroll-certificat')]//i[contains(@class,'fa-duotone fa-circle icon')]",
        certificateCheckbox: (index: string) => `(//div[contains(@id,'scroll-certificat')]//i[contains(@class,'fa-duotone fa-circle icon')])[${index}]`,
        addBtn: "//button[text()='Add']",
        certificationVerifyMessage: "//span[text()='Completion Certificate has been created successfully.']",
        accessBtn: "//span[text()='Access']",
        accessCloseIcon: "//i[contains(@class,'fa-swap-opacity icon')]",
        accessUserInput: "//label[text()='User']/parent::div/following-sibling::div//input",
        saveAccessBtn: "//button[text()='Save Access']",
        enforceSequencingCheckbox: "//span[text()='Enforce Sequencing']/preceding-sibling::i[@class='fa-duotone fa-square']",
        // category:(categoryOption:string)=>`//div[@id='new-course-categorys']//following::select[@name='course-categorys-exp-select']/option[text()='${categoryOption}']`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context,);
    }


    async verifyCreateUserLabel(expectedLabel: string) {
        await this.verification(this.selectors.createUserLabel, expectedLabel);
    }

    async typeDescription(data: string) {
        await this.type(this.selectors.courseDescriptionInput, "Description", data);
    }

    async uploadvideo() {
        const path = `../data/video1.mp4`
        await this.mouseHover(this.selectors.uploadDiv, "upload");
        await this.uploadFile(this.selectors.uploadInput, path);
        await this.validateElementVisibility(this.selectors.progress, "Loading")
        await this.validateElementVisibility(this.selectors.attachedContent("video1"), "video1");
        
    }

    async uploadCourseContent(fileName:string) {
        const path = `../data/${fileName}`
        await this.mouseHover(this.selectors.uploadDiv, "upload");
        await this.uploadFile(this.selectors.uploadInput, path);
        await this.validateElementVisibility(this.selectors.progress, "Loading")
        await this.validateElementVisibility(this.selectors.attachedContent(fileName), `${fileName}`);
        
    }
    async clickCatalog() {
        await this.validateElementVisibility(this.selectors.showInCatalogBtn, "Show in Catalog");
        await this.click(this.selectors.showInCatalogBtn, "Catalog", "Button");
    }

    async clickSaveasDraft() {
        await this.validateElementVisibility(this.selectors.clickSaveasDraft, "Draft");
        await this.click(this.selectors.clickSaveasDraft, "Draft", "CheckBox");
    }

    async clickSave() {
        await this.validateElementVisibility(this.selectors.saveBtn, 'Save');
        await this.click(this.selectors.saveBtn, "Save", "Button");
    }

    async clickProceed() {
        await this.validateElementVisibility(this.selectors.proceedBtn, "Proceed");
        await this.click(this.selectors.proceedBtn, "Proceed", "Button");
    }

    async verifySuccessMessage() {
        await this.verification(this.selectors.successMessage, "successfully");
    }

    async selectDomain(domain_name: string) {
        await this.click(this.selectors.domainBtn, "Domain", "Button");
        await this.click(this.selectors.domainOption(domain_name), "Domain Name", "Button");
        await this.click(this.selectors.domainBtn, "Domain", "Button");
    }

    async selectPortalOption() {
        await this.click(this.selectors.portalDropdown, "Portal", "dropdown");
        const index=await this.page.locator("//label[text()='Domain']/following::div[@class='dropdown-menu show']//a").count();
        const randomIndex = Math.floor(Math.random() *  index)+ 1;
        await this.click(this.selectors.portalOption(randomIndex), "Domain Name", "Button");
    }

    async selectLanguage(language: string) {
        await this.click(this.selectors.courseLanguagesWrapper, "Language", "Field");
        await this.type(this.selectors.courseLanguageInput, "Input Field", language);
        await this.mouseHover(this.selectors.courseLanguageLink(language), language);
        await this.click(this.selectors.courseLanguageLink(language), language, "Button");

    }

    async clickSelect(category: string) {
        await this.click(this.selectors.selectCategoryBtn, "Category", "Dropdown");
        await this.click(this.selectors.categoryOption(category), "Category", "Dropdown");
    }

    async uploadVideoThroughLink() {
        await this.mouseHover(this.selectors.httpsInput, "https input");
        await this.keyboardType(this.selectors.httpsInput, "https://www.youtube.com/watch?v=K4TOrB7at0Y");
        await this.wait('minWait');
        await this.click(this.selectors.addURLBtn, "Add URL", "Button");
        await this.wait('maxWait');
    }

    async addCategory(CategoryName: string) {
        await this.click(this.selectors.addCategoryBtn, "Add category", "Field");
        await this.type(this.selectors.categoryInput, "Category", CategoryName);
    }

    async clickOk() {
        await this.click(this.selectors.okBtn, "Tick", "image");
    }

    async modifyTheAccess() {
        await this.mouseHover(this.selectors.modifyTheAccessBtn, "No, Modify The Access");
        await this.click(this.selectors.modifyTheAccessBtn, "No, Modify The Access", "Button");
    }
    async clickCancel() {
        await this.click(this.selectors.cancelBtn, "Cancel", "image");
    }

    async selectProvider(provider: string) {
        await this.click(this.selectors.providerDropdown, "Default Provider", "Dropdown Field");
        await this.click(this.selectors.providerOption(provider), "Provider", "Dropdown Value");
    }

    async selectTotalDuration(duration: string) {
        await this.typeAndEnter(this.selectors.totalDurationInput, "Duration", duration);
    }

    async typeAdditionalInfo(additionalInfo: string) {
        await this.type(this.selectors.additionalInfoInput, "Additional Information", additionalInfo);
    }

    async enterPrice(price: string) {
        await this.type(this.selectors.priceInput, "Price", price);
    }

    async selectCurrency() {
        await this.click(this.selectors.currencyDropdown, "Currency", "Field");
        await this.click(this.selectors.currencyOption, "Currency", "Selected");
    }

    async selectSeats(seatCount: string) {
        await this.type(this.selectors.maxSeatsInput, "Max-Seats", seatCount);
    }

    async contactSupport(email: string) {
        await this.type(this.selectors.contactSupportInput, "ContactSupport", email);
    }

    async selectCompliance() {
        await this.click(this.selectors.complianceField, "Compaliance", "Field");
        await this.click(this.selectors.complianceOption, "Compaliance", "Field");
    }
    async selectCompleteByRule() {
        await this.click(this.selectors.completeByRule, "CompleteByRule", "Field");
        await this.click(this.selectors.completeByRuleOption, "CompleteByRule Option", "Field");
    }

    async selectValidity() {
        await this.click(this.selectors.validityField, "Valitdity", "field");
        await this.click(this.selectors.validityOption, "Days", "Field");
    }

    async enterDate(date: string) {
        await this.type(this.selectors.validityDateInput, "Date ", date);
    }

    async daysOfValidity(days: string) {
        await this.type(this.selectors.validityDaysInput, "Days", days);
    }

    async selectCompleteBy() {
        await this.click(this.selectors.completeByField, "CompleteBy", "Field");
    }

    async selectDaysfromEnrollment() {
        await this.click(this.selectors.chooseTimeOption("Days from Enrollment"), "Days from Enrollment", "Dropdown");
    }

    async selectDaysfromHire() {
        await this.click(this.selectors.chooseTimeOption("Days from Hire"), "Days from Hire", "Dropdown");
    }

    async enterCompleteByDate(date: string) {
        await this.type(this.selectors.completeByField, "Choose Date", date);
    }

    async completByDays(days: string) {
        await this.type(this.selectors.completeByDaysInput, "ComplebyDays", days);
    }

    async selectPostCompletebyOverDue() {
        await this.click(this.selectors.postCompleteByStatusField, "Default Incomplete", "dropdown");
        await this.click(this.selectors.postCompleteByOption, "Overdue", "Option");
    }

    async selectInstance() {
        await this.click(this.selectors.courseInstancesField, "Default Single Instance", "dropdown");
        await this.click(this.selectors.instanceTypeOption, "Multi Instance", "Option");
    }

    async clickHideinCatalog() {
        await this.click(this.selectors.hideInCatalogCheckbox, "Hide in Catalog", "checkbox");
    }

    async clickSaveinDraft() {
        await this.click(this.selectors.saveInDraftCheckbox, "Save in Draft", "checkbox");
    }

    async selectdeliveryType(deliveryType: string) {
        await this.click(this.selectors.deliveryTypeDropdown, "Course Delivery", "dropdown");
        await this.mouseHover(this.selectors.deliveryTypeOption(deliveryType), "Delivery Type");
        await this.click(this.selectors.deliveryTypeOption(deliveryType), "Delivery Type", "Selected");
    }

    async clickEditCourseTabs() {
        await this.click(this.selectors.editCourseTabLink, "Edit Course", "Button");
    }

    async selectCompleteByDate() {
        await this.click(this.selectors.CourseCalendaricon, "Date", "Field");
        await this.click(this.selectors.tomorrowdate, "Tomorrow", "Field")
    }
    async selectDate() {
        await this.click(this.selectors.CourseCalendaricon, "Date", "Field");
        await this.wait("minWait")
        await this.click(this.selectors.nextMonth, "Next", "button")
        await this.wait("minWait")
        await this.click(this.selectors.randomDate, "RandomDate", "Field")
    }
    async clickregistrationEnds() {
        await this.type(this.selectors.registrationEnd, "Enter Date", getCurrentDateFormatted())
    }


    // async selectLocation(locationName: string) {
    //     await this.click(this.selectors.locationSelection,"Select location","Field")
    //     await this.click(this.selectors.locationDropdown, "Select Location", "DropDown");
    //     await this.type(this.selectors.locationDropdown, "Location", locationName);
    //     await this.mouseHover(this.selectors.locationOption(locationName), "Location Option");
    //     await this.click(this.selectors.locationOption(locationName), "Location Option","Selected");

    // }
    async addInstances() {
        await this.validateElementVisibility(this.selectors.addInstancesBtn, "Add Instances");
        await this.mouseHover(this.selectors.addInstancesBtn, "Add Instances");
        await this.click(this.selectors.addInstancesBtn, "Add Instances", "Button");
    }

    async selectInstanceDeliveryType(delivery: string) {
        await this.validateElementVisibility(this.selectors.deliveryLabel, "Delivery Label")
        await this.click(this.selectors.instanceDeliveryTypeField, "Select Instance Type", "Option");
        await this.click(this.selectors.instanceDeliveryTypeOption(delivery), "Instance DeliveryType", "Option");
    }

    async enterInstanceCount(count: string) {
        await this.type(this.selectors.instanceCountInput, "Instance Count", count);
    }

    async clickCreateInstance() {
        await this.click(this.selectors.createInstanceBtn, "Create Instances", "Button");
        await this.waitForElementHidden("//footer/following::i[contains(@class,'duotone fa-times pointer')]", "X Button")

    }

    async enterSessionName(sessionName: string) {
        await this.validateElementVisibility(this.selectors.sessionNameInput, "Session Name");
        await this.mouseHover(this.selectors.sessionNameInput, "Session Name")
        await this.type(this.selectors.sessionNameInput, "Session Name", sessionName);
    }

    async selectInstructor(instructorName: string) {
        await this.click(this.selectors.instructorDropdown, "Select Instructor", "DropDown");
        await this.type(this.selectors.instructorInput, "Instructor Name", instructorName);
        await this.mouseHover(this.selectors.instructorOption(instructorName), "Instructor Name");
        await this.click(this.selectors.instructorOption(instructorName), "Instructor Name", "Button")
    }

    async selectLocation() {
        await this.click(this.selectors.locationSelection, "Select Location", "DropDown");
        await this.click(this.selectors.locationDropdown, "Select Location", "DropDown");
        let location = getRandomLocation()
        await this.type(this.selectors.locationDropdown, "Select Location", location);
        await this.mouseHover(this.selectors.locationOption(location), "Location");
        await this.click(this.selectors.locationOption(location), "Location", getRandomLocation());

    }
    async enterStartDate() {
        const date = getCurrentDateFormatted();
        await this.keyboardType(this.selectors.startDateInstanceIndex(1), date);
    }

    async enterDateValue() {
        const date = getCurrentDateFormatted();
        await this.keyboardType(this.selectors.Date, date);
    }


    async entertimezone(country: string) {
        await this.click(this.selectors.timeZoneIndex(1), "TimeZone", "Text Field")
        await this.type(this.selectors.timeZoneOption, "Time Zone", country)
        await this.mouseHover(this.selectors.indianTimezone, "Indian Time zone")
        await this.click(this.selectors.indianTimezone, "Indian Timezone", "Selected")
    }
    async setCurrentDate() {
        await this.mouseHover(this.selectors.calanderIcon, "Calander Icon");
        await this.click(this.selectors.calanderIcon, "Calander Icon", "Button");
        //await this.click(this.selectors.todayDate, "Date", "Today's Date");
        await this.click(this.selectors.tomorrowdate, "Date", "Today's Date");
    }

    async setMaxSeat() {
        await this.typeAndEnter(this.selectors.seatMaxInput, "Instance Max Seat", await getRandomSeat());
    }

    public async startandEndTime() {
        const pickRandomTime = async () => {
            const timeElements = await this.page.locator("//div[contains(@class,'timepicker')]//li").count();
            const randomIndex = Math.floor(Math.random() * timeElements) + 1; // Random index from 1 to timeElements
            return randomIndex;
        };
        const randomIndex = await pickRandomTime();
        console.log("Random Index:", randomIndex);
        await this.click(this.selectors.timeInput, "Start Time", "Button");
        await this.click(this.selectors.chooseTimeOption(randomIndex), "Option", "Button");
    }


    async waitList() {
        await this.type(this.selectors.waitlistInput, "WaitList", "4");
    }

    async clickUpdate() {
        await this.click(this.selectors.updateBtn, "update", "field");
        const locator = this.page.locator(this.selectors.willResolveLaterBtn);
        await this.wait('mediumWait');

        try {
            await this.validateElementVisibility(this.selectors.willResolveLaterBtn, "Resolve Later");
            if (await locator.isVisible({ timeout: 5000 })) {
                await this.mouseHover(this.selectors.willResolveLaterBtn, "Resolve Later");
                await this.click(this.selectors.willResolveLaterBtn, "Resolve Later", "Button");
            }
        } catch (error) {
            console.log("The element is not visible: ");
        }

        // Continue with other operations without throwing an error

    }

    async clickDetailButton() {
        await this.mouseHover(this.selectors.detailsbtn, "details");
        await this.click(this.selectors.detailsbtn, "details", "button");
    }

    async save_editedcoursedetails() {

        await this.click(this.selectors.detailsbtn, "details", "button");
        await this.clickCatalog();
        await this.validateElementVisibility(this.selectors.courseUpdateBtn, "button");
        await this.click(this.selectors.courseUpdateBtn, "Update", "button");

    }

    async addsurvey_course() {
        await this.wait('minWait')
        await this.validateElementVisibility(this.selectors.surveyAndAssessmentLink, "Survey/Assessment")
        await this.click(this.selectors.surveyAndAssessmentLink, "Survey/Assessment", "Link")
        await this.wait('mediumWait')
        const popup = this.page.locator("//span[text()='You have unsaved changes that will be lost if you wish to continue. Are you sure you want to continue?']")
        if (await popup.isVisible({ timeout: 5000 })) {
            await this.click("//button[text()='YES']", "yes", "button")
        }
        await this.click(this.selectors.surveyAndAssessmentLink, "Survey/Assessment", "button");
        await this.wait('mediumWait')
        const selector = this.page.locator(this.selectors.surveyCheckBox);
        const checkboxCount = await selector.count();
        const randomIndex = Math.floor(Math.random() * checkboxCount);
        await this.page.locator(this.selectors.surveyCheckBox).nth(randomIndex).click();
        await (await this.page.waitForSelector(this.selectors.addSurveyBtn)).isEnabled()
        await this.click(this.selectors.addSurveyBtn, "Addsurvey", "button");
        await this.waitForElementHidden("div[class='text-center p-5']", "Spiner")
    }

    async editcourse() {
        await this.mouseHover(this.selectors.editCourseBtn, "editcourse");
        await this.click(this.selectors.editCourseBtn, "editcourse", "button");
    }

    async clickinstanceClass() {
        await this.page.waitForSelector(this.selectors.instance_Class);
        await this.wait("mediumWait");
        await this.click(this.selectors.instance_Class, "Edit Instance Class", "Button");
    }

    async contentLibrary() {
        await this.spinnerDisappear();
        await this.validateElementVisibility(this.selectors.clickContentLibrary, "Content");
        await this.mouseHover(this.selectors.clickContentLibrary, "Content");
        await this.click(this.selectors.clickContentLibrary, "Content", "button");
        await this.waitForElementHidden("//span[text()='Counting backwards from Infinity']", "string");
        await this.spinnerDisappear();
        const randomIndex = Math.floor(Math.random() * 5) + 1;
        await this.click(this.selectors.contentIndex(2), "Contents", "checkbox");
        await this.mouseHover(this.selectors.addContentButton, "addcontent");
        await this.click(this.selectors.addContentButton, "addcontent", "button");
        await this.wait('maxWait');
        await this.mouseHover(this.selectors.attachedContentLabel, "button");
        await this.validateElementVisibility(this.selectors.attachedContentLabel, "button");
    }

    async MultipleContent() {
        const fileName = "sample"
        const pdf = `../data/${fileName}.pdf`
        const video = "../data/video1.mp4"
        const locator = this.selectors.uploadInput
        await this.mouseHover(this.selectors.uploadDiv, "upload");
        await this.uploadMultipleContent(pdf, video, locator);
        await this.validateElementVisibility(this.selectors.progress, "Loading");
        await this.validateElementVisibility(this.selectors.attachedContent(fileName), fileName)
    }



    async sessionType() {
        await this.click(this.selectors.sessionType, "Session Type", "Button");
        await this.click(this.selectors.otherMeeting, "Other Meeting", "Drop Down");
    }

    async uploadPDF() {
        const fileName = "sample"
        const path = `../data/${fileName}.pdf`
        await this.mouseHover(this.selectors.uploadDiv, "upload");
        await this.uploadFile(this.selectors.uploadInput, path);
        await this.validateElementVisibility(this.selectors.progress, "Loading");
        await this.validateElementVisibility(this.selectors.attachedContent(fileName), fileName)
    }
    async addAssesment() {
        const selector = this.page.locator(this.selectors.assessmentCheckbox);
        const checkboxCount = await selector.count();
        if (checkboxCount < 2) {
            throw new Error("Not enough checkboxes to select two distinct ones");
        }
        const selectedIndices = new Set<number>();
        while (selectedIndices.size < 2) {
            const randomIndex = Math.floor(Math.random() * checkboxCount);
            selectedIndices.add(randomIndex);
        }
        for (const index of selectedIndices) {
            await selector.nth(index).click();
        }
        await this.click(this.selectors.addAssessmentBtn, "Addassesment", "button")
        await this.wait('maxWait')
    }


    async addmultipleContentfromLib() {

        const content = this.page.locator(this.selectors.allContents);
        const checkboxCount = await content.count();
        if (checkboxCount < 2) {
            throw new Error("Not enough checkboxes to select two distinct ones");
        }
        const selectedIndices = new Set<number>();
        while (selectedIndices.size < 2) {
            const randomIndex = Math.floor(Math.random() * checkboxCount);
            selectedIndices.add(randomIndex);
        }
        for (const index of selectedIndices) {
            await content.nth(index).click();
        }
        await this.click(this.selectors.addContentButton, "addcontent", "button")
        await this.wait("maxWait");
    }


    async handleCategoryADropdown() {

        await this.click(this.selectors.selectCategoryBtn, "dropdown", "button")
        const categoryElements = await this.page.$$(this.selectors.allCategoryOptions);

        const randomIndex = Math.floor(Math.random() * categoryElements.length);
        const randomElement = categoryElements[randomIndex].textContent();
        const randomtext = await randomElement;
        await this.typeText(this.selectors.categoryDropdown, "input", randomElement)

        await this.click(this.selectors.categoryOption(randomtext), "options", "button")
    }

    async providerDropdown() {

        const providerElements = await this.page.$$(this.selectors.providerOptions);
        const randomIndex = Math.floor(Math.random() * providerElements.length);
        const randomElement = providerElements[randomIndex].textContent();
        const randomOptions = await randomElement
        await this.click(this.selectors.providerDropdown, "dropdown", "button")
        await this.click(this.selectors.provider(randomOptions), "option", "button")

    }

    async getCourse() {
        const course = await this.getText(this.selectors.getCourse);
        console.log(course);

    }
    async selectPortal() {
        try{
        const text = await this.page.innerText(this.selectors.domainSelectedText);
        console.log(text);

        if (text.includes('selected')) {
            const dropdownItems = await this.page.$$(this.selectors.domainDropdown);
            for (let index = 2; index <= dropdownItems.length; index++) {
                await this.click(this.selectors.domainSelectedText, "dropdown", "button")
                await this.click(this.selectors.domainDropdownIndex(index), "Domain", "Dropdown");
            }
        }
}   catch(error){
    console.log(error +" Portal selected")
} 
        const domainText = await this.page.innerText(this.selectors.domainInnerValue);
        return domainText;
    }



    async clickHere() {
        await this.mouseHover(this.selectors.clickHere, "Click Here");
        await this.click(this.selectors.clickHere, "Click Here", "button");
    }

    async selectImage() {
        await this.validateElementVisibility(this.selectors.image, "Loading")
        await this.click(this.selectors.image, "Gallery", "image");
    }


    async selectMeetingType(instructorName: string, sessionName: string, index: number) {
        //  const sessiontype = this.page.locator(this.selectors.selectType);
        const pickRandomTime = async () => {
            const timeElements = await this.page.locator(`(//ul[@class='ui-timepicker-list'])[${index}]/li`).count();
            const randomIndex = Math.floor(Math.random() * timeElements) + 1; // Random index from 1 to timeElements
            return randomIndex;
        };
        const randomIndex = await pickRandomTime();
        console.log("Random Index:", randomIndex);
        const country = "kolkata"
        const meetingUrl = FakerData.getMeetingUrl()
        await this.click(this.selectors.sessionTypeIndex(index), "Session Type", "dropdown")
        await this.click(this.selectors.otherMeetingIndex(index), "other Meeting", "Option")
        await this.validateElementVisibility(this.selectors.sessionNameIndex(index), "Session Name");
        await this.mouseHover(this.selectors.sessionNameIndex(index), "Session Name")
        await this.type(this.selectors.sessionNameIndex(index), "Session Name", sessionName);
        await this.click(this.selectors.timeZoneIndex(index), "TimeZone", "Text Field")
        await this.type(this.selectors.timeZoneOption, "Time Zone", country)
        await this.mouseHover(this.selectors.indianTimezone, "Indian Time zone")
        await this.click(this.selectors.indianTimezone, "Indian Timezone", "Selected")
        await this.type(this.selectors.startDateInstanceIndex(index), "Start Date", getCurrentDateFormatted())
        await this.click(this.selectors.timeInputIndex(index), "Start Time", "Selected")
        await this.click(this.selectors.chooseStartTimeIndex(index, randomIndex), "StartTime", "Selected")
        await this.type(this.selectors.attendeeUrlIndex(index), "Attendee url", meetingUrl)
        await this.type(this.selectors.presenterUrlIndex(index), "Presenter url", meetingUrl)
        await this.click(this.selectors.instructorDropdownIndex(index), "Select Instructor", "DropDown");
        await this.type(this.selectors.instructorInput, "Instructor Name", instructorName);
        await this.mouseHover(this.selectors.instructorOption(instructorName), "Instructor Name");
        await this.click(this.selectors.instructorOption(instructorName), "Instructor Name", "Button")
    }

    async attendeeUrl() {
        await this.type(this.selectors.attendeeUrlIndex(1), "Attendee url", FakerData.getMeetingUrl());
    }

    async presenterUrl() {
        await this.type(this.selectors.presenterUrlIndex(1), "Presenter url", FakerData.getMeetingUrl())
    }

    async clickaddIcon() {
        await this.click(this.selectors.addDeleteIcon, "Add Icon", "Button")
    }


    async startDateVC() {
        await this.type(this.selectors.startDateInstance, "Start Date", getCurrentDateFormatted())
    }

    async addAttendeeUrl(attendeeUrl: string) {
        await this.type(this.selectors.attendeeUrl, "Attendee url", attendeeUrl)
    }

    async addPresenterUrl(presenterUrl: string) {
        await this.type(this.selectors.presenterUrl, "Presenter url", presenterUrl)
    }

    async clickCompletionCertificate() {
        await this.validateElementVisibility(this.selectors.completionCertificationlink, "Completion Certificate");
        await this.click(this.selectors.completionCertificationlink, "Completion Certificate", "Button");
        await this.spinnerDisappear();
    }

    async clickCertificateCheckBox() {
        const loadMore = this.page.locator(this.selectors.loadMoreBtn);
        if (await loadMore.isVisible()) {
            await this.click(this.selectors.loadMoreBtn, "Load More", "Button");
        }
        await this.spinnerDisappear();
        const count = await this.page.locator(this.selectors.certificateCheckboxCount).count();
        console.log(count);
        const randomIndex = Math.floor(Math.random() * (count)) + 1;
        await this.wait('minWait');
        await this.mouseHover(this.selectors.certificateCheckbox(randomIndex), "Certificate CheckBox");
        await this.click(this.selectors.certificateCheckbox(randomIndex), "Certificate CheckBox", "Checkbox");
    }

    async clickAdd() {
        await this.validateElementVisibility(this.selectors.addBtn, "Add");
        await this.mouseHover(this.selectors.addBtn, "Add");
        await this.click(this.selectors.addBtn, "Add", "Button");
        await this.verification(this.selectors.certificationVerifyMessage, "created successfully");
        await this.click(this.selectors.okBtn, "Ok", "Button");
    }

    async clickAccessButton() {
        await this.validateElementVisibility(this.selectors.accessBtn, "Access"),
            await this.click(this.selectors.accessBtn, "Access", "Link")
        await this.wait('mediumWait');
    }

    async addSingleLearnerGroup(data: any) {
        const closeIcon = this.page.locator(this.selectors.accessCloseIcon);
        const count = await closeIcon.count();
        for (let i = 1; i < count; i++) {
            await this.page.locator(this.selectors.accessCloseIcon).nth(i).click({ force: true })
        }
        await this.type(this.selectors.accessUserInput, "User", data);
        await this.click(`//li[text()='${data}']`, "User", "List");
    }

    async saveAccessButton() {
        await this.click(this.selectors.saveAccessBtn, "Save Access", "Button")
    }

}