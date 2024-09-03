import { Page, expect, BrowserContext } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";
import { FakerData, getCCnumber, getPonumber } from "../utils/fakerUtils";
import { saveDataToJsonFile } from "../utils/jsonDataHandler";
import { Certificate } from "crypto";
import { th } from "@faker-js/faker";
//import { VideoPlayer } from "../utils/videoplayerUtils";
//import { playAndForwardVideo } from "../utils/videoplayerUtils";

export class CatalogPage extends LearnerHomePage {
    public selectors = {
        ...this.selectors,
        searchInput: `//input[@id="exp-searchcatalog-search-field"]`,
        searchlearningInput: `//input[@id="exp-searchenr-search-field"]`,
        mostRecentMenuItem: `//div[text()="Most Recent"]`,
        createdCourse: ` //div[text()='Most Recent']/following::li[1]`,
        moreButton: (course: string) => `(//div[text()="${course}"]/following::a/i)[1]`,
        enrollIcon: `//div[text()='Most Recent']//following::i[contains(@class,'tooltipIcon fa-duotone')][1]`,
        courseToEnroll: (course: string) => `//span[text()='${course}']//following::i[contains(@class,'fa-circle icon')]`,
        selectCourse: (course: string, index: number) => `(//span[text()='${course}']//following::i[contains(@class,'fa-circle icon')])[${index}]`,
        enrollButton: `//span[text()='Enroll']`,
        requestApproval: `//span[text()='Request approval']`,
        approvalcostcenter: `//input[@id='cc']`,
        submitRequest: `//button[text()='Submit request']`,
        closeBtn: `(//button[text()='Close'])[1]`,
        //launchButton:`//button[text()="Launch Content"]`,
        completedButton: `//a[contains(text(),"Completed")]`,
        completedCourse: (name: string) => `(//h5[text()="${name}"])[1]`,
        filterField: `//h1[text()='Catalog']/following::div[text()='Filters']`,
        searchButton: `(//span[text()='Tags']/following::div[text()='Select'])[1]`,
        selectTagnames: `//div[contains(@class,'dropdown-menu show')]//input`,
        reultantTagname: (tagname: string) => `//span[text()='${tagname}']`,
        applyButton: `//button[text()='Apply']`,
        viewCourseDetails: `//button[text()='View Course Details']`,
        launchButton: `(//div//i[@aria-label='Click to play'])[1]`,
        saveLearningStatus: "//button[text()='Save Learning Status']",
        verificationEnrollment: "//span[text()='View Certificate']",
        unsupportMedia: "//div[contains(text(), 'The media could not be loaded')]",
        posterElement: `//button[@class='vjs-big-play-button']//span[1]`,
        viewCertificationDetailsBtn: "//button[text()='View Certification Details']",
        viewlearningPathDetailsBtn: "//button[text()='View Learning Path Details']",
        viewCertificateBtn: "//div[text()='modules/courses']/parent::div//span[text()='View Certificate']",
        okBtn: "//button[text()='Ok']",
        addToCart: `//span[text()='Add to cart']`,
        contentLaunchBtn: "//button//span[text()='Launch']",
        contentsLabel: "//button[text()='Save Learning Status']//following::span[contains(text(),'Content')]",
        completedVideo: "//span[text()='100%']",
        expiredContent: "//span[text()='Expired']",
        recertifyBtn: "//span[text()='Recertify']",
        shoppingCardIcon: "//div[@aria-label='shopping cart']//i[contains(@class,'cart-shopping')]",
        addedToCartBtn: "//span[text()='Added to Cart']",
        proceedToCheckoutBtn: "//button[text()=' Proceed to checkout']",
        resultNotFound: `(//div[@id='most_recent']/following::div[text()='No results found.'])[1]`,
        checkBox: `//i[contains(@class,'fa-circle icon') ]`,
        RadioBtn: `//i[contains(@class,'fa-square icon')]`,
        assessmentDropdown: `[id^='wrapper-ques'] button[data-bs-toggle='dropdown']`,
        questionInput: `div[class='question-wrapper'] input[type=text]`,
        starIcon: `//i[contains(@class,'fa-star icon')]`,
        submitMyAnswerBtn: `div[class^='pagination-wrapper'] span:text-is('Submit my Answers')`,
        submitSurveyBtn: `div[class^='pagination-wrapper'] span:text-is('submit survey')`,
        filterDeliverytype: (delivery: string) => `//span[text()='${delivery}']/preceding-sibling::i[1]`,
        multiInstancefilter: `(//div[text()='Filters'])[1]`,
        clickPlayIcon: `(//a[contains(@class,'launch-content')])[1]`,
        //doneBtn: `//span[text()='done']`, --> Element has been changed (06/08/2024)
        //doneBtn: `//button[text()='Done']`,
        doneBtn: `//i[contains(@class,'fa-circle-check icon')]//following::button[text()='Done']`,
        //recievedScore: `//span[text()='Score:']//parent::div`, Element has been changed (06/08/2024)
        //recievedScore: `//div[contains(text(),'Score:')]`
        recievedScore: `//i[contains(@class,'fa-circle-check icon')]//following::div[contains(text(),'Score:')]`,
        surveyPlayBtn: "//i[contains(@class,'fa-file-edit')]//parent::div//following-sibling::div//i",
        noCertificate: "//span[text()='Completion certificate not attached to this training.']",
        certificateCloseIcon: "//i[contains(@class,'pointer ms-auto')]",
        secondaryCourse: (course: string) => `//div[contains(text(),'${course}')]`,
        completePreviousContent: "//div[contains(text(),'You need to complete the previous content')]",
        recommendationLink: `//a[text()='Recommendations']`,
        verifyRecommendCourse: (course: string) => `//div[text()='${course}']`,
        overDueText: "//span[text()='Overdue']",

    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    async searchCatalog(data: string) {
        const searchSelector = this.selectors.searchInput;
        await this.type(searchSelector, "Search Field", data);
        await this.keyboardAction(searchSelector, "Enter", "Input", "Search Field");
        await this.page.waitForTimeout(10000);
    }

    async clickRecommendation() {
        await this.click(this.selectors.recommendationLink, "Recommendations", "Link")
    }

    async verifyCourserecommemnded(course: string) {
        this.validateElementVisibility(this.selectors.verifyRecommendCourse(course), "course")
        await this.mouseHover(this.selectors.verifyRecommendCourse(course), "Text");
    }

    async cronstoragejson(filepath: string, data: string) {
        saveDataToJsonFile(filepath, data);
    }

    async mostRecent() {
        await this.validateElementVisibility(this.selectors.mostRecentMenuItem, "Most Recent");
        await this.mouseHover(this.selectors.mostRecentMenuItem, "Most Recent");
    }

    async verifyOverdue(data: string) {
        await this.click(this.selectors.completedCourse(data), "To Complete", "Link");
        await this.wait('mediumWait');
        await this.validateElementVisibility(this.selectors.overDueText, "Overdue");
        await this.verification(this.selectors.overDueText, "Overdue")

    }

    async clickMoreonCourse(courseName: string) {
        await this.mouseHover(this.selectors.moreButton(courseName), "More on Course")
        await this.click(this.selectors.moreButton(courseName), "More on Course", "icon")
    }
    async clickcourseTypeFilter() {
        await this.click(this.selectors.multiInstancefilter, "Filter Delivery type", "checkbox");
    }

    async clickEnrollButton() {
        await this.page.locator(this.selectors.createdCourse).scrollIntoViewIfNeeded();
        const enrollButtonSelector = this.selectors.enrollIcon;
        await this.validateElementVisibility(enrollButtonSelector, "Course");
        await this.click(enrollButtonSelector, "Enrolling Course", "Button");
    }

    async clickSelectcourse(course: string) {
        const count = await this.page.locator(this.selectors.courseToEnroll(course)).count();
        const randomIndex = Math.floor(Math.random() * count) + 1
        await this.click(this.selectors.selectCourse(course, randomIndex), "Checkbox", "Button")
    }

    async clickEnroll() {
        await this.click(this.selectors.enrollButton, "Enroll", "Button");
        const cancelEnrollmentBtn = this.page.locator("//span[text()='Cancel Enrollment']");
        await this.wait('mediumWait');
        await this.validateElementVisibility(cancelEnrollmentBtn, "Cancel Enrollement");
        await this.wait('minWait')
        /* this.page.on('console', msg => {
            console.log(`Console Log: ${msg.text()}`);
        }); */


    }
    async clickRequestapproval() {
        await this.click(this.selectors.requestApproval, "Request Approval", "Button");
    }
    async requstcostCenterdetails() {
        await this.validateElementVisibility(this.selectors.approvalcostcenter, "Approval POPup")
        await this.type(this.selectors.approvalcostcenter, "Approval POPup", getCCnumber())//const center number of 10 digits
        await this.click(this.selectors.submitRequest, "Submit Request", "Button")
        await this.click(this.selectors.closeBtn, "Close", "Button")
    }

    async clickRecertify() {
        await this.validateElementVisibility(this.selectors.recertifyBtn, "Recertify")
        await this.click(this.selectors.recertifyBtn, "Recertify", "Button");
        await this.validateElementVisibility(this.selectors.viewCertificateBtn, "View Certificate");
        await this.mouseHover(this.selectors.completedVideo, "Completed Video");
        await this.wait('mediumWait');
    }
    // async clickLaunchButton() {

    //    // playAndForwardVideo(this.selectors.launchButton)
    //     const launchButtonSelector = this.selectors.launchButton;
    //     await this.validateElementVisibility(launchButtonSelector,"Play Button");
    //     await this.mouseHover(launchButtonSelector, "Launch Button")
    //     await this.click(launchButtonSelector, "Launch Button", "Button");
    //     try {
    //         await this.wait('mediumWait');
    //         await this.validateElementVisibility("//span[text()='0:00']", "time")
    //     } catch (error) {
    //         console.log("Its not a video content")

    //     }
    // }

    // async saveLearningStatus(){
    //     await this.click(this.selectors.saveLearningStatus,"save","button")
    // }

    async clickLaunchButton() {
        await this.page.waitForLoadState('load');
        await this.wait('maxWait');
        const playButton = "//button[@title='Play Video']"
        /*  const myElement = document.querySelector("#movie_player") as HTMLElement; 
         myElement.addEventListener("click", (event) => {
             myElement.click()
           }); */
        await this.mouseHover(playButton, "Play Button")
        await this.page.focus(playButton, { strict: true });
        await this.page.click(playButton, { force: true })
        await this.wait('maxWait');
        await this.wait('mediumWait');
    }

    async clickSecondaryCourse(course: string, text?: string) {
        await this.validateElementVisibility(this.selectors.secondaryCourse(course), course,);
        await this.wait('minWait');
        await this.click(this.selectors.secondaryCourse(course), course, "List");
        await this.wait('mediumWait');
        if (text === "Verification") {
            let courseVisible = this.page.locator(this.selectors.completePreviousContent);
            await expect(courseVisible).toBeVisible()
            console.error("You need to complete the previous content to launch this content.");
        }
    }

    async saveLearningStatus() {
        await this.click(this.selectors.saveLearningStatus, "save", "button");
        await this.validateElementVisibility(this.selectors.verificationEnrollment, "button");
        await this.spinnerDisappear();
        const completed = this.page.locator(this.selectors.completedVideo);
        try {
            if (await completed.isVisible()) {
                await completed.scrollIntoViewIfNeeded();
                console.log("The Video Has Completed");
            } else {
                await this.clickLaunchButton();
                await this.saveLearningStatus();
            }
        } catch (error) {
            console.log("Try to launch the button");
        }
    }
    


    async searchMyLearning(data: string) {
        const searchSelector = this.selectors.searchlearningInput;
        await this.type(searchSelector, "Search Field", data);
        await this.keyboardAction(searchSelector, "Enter", "Input", "Search Field");
        await this.page.waitForTimeout(10000);
    }


    async clicksaveLearningStatus() {
        await this.click(this.selectors.saveLearningStatus, "save", "button");
        await this.validateElementVisibility(this.selectors.verificationEnrollment, "button");
        await this.spinnerDisappear();
        const completed = this.page.locator(this.selectors.completedVideo);
        try {
            if (await completed.isVisible()) {
                await completed.hover({ force: true });
                console.log("The Video Has Completed");
            }
        } catch (error) {
            console.log("Try to launch the button");
        }

    }
    async clickCompletedButton() {
        await this.wait('mediumWait');
        const name = "Completed Button";
        const completedButtonSelector = this.selectors.completedButton;
        await this.mouseHover(completedButtonSelector, name);
        await this.validateElementVisibility(completedButtonSelector, name);
        await this.click(completedButtonSelector, name, "Button");
        await this.wait('mediumWait');
    }

    async verifyCompletedCourse(name: string) {
        const completedCourseSelector = this.selectors.completedCourse(name);
        await this.mouseHover(completedCourseSelector, "Text");
    }

    async verifyExpiredContent() {
        await this.validateElementVisibility(this.selectors.expiredContent, "Expired");
        await this.verification(this.selectors.expiredContent, "Expired")
    }
    async clickFilter() {
        await this.validateElementVisibility(this.selectors.filterField, "Filter Search");
        await this.wait('mediumWait');
        await this.click(this.selectors.filterField, "Filter Search", "clicked")
    }

    async clickDeliveryType(typeName: string) {
        await this.click(this.selectors.filterDeliverytype(typeName), "Delivery type ", "Filter")
    }

    /*  async enterSearchFilter(tagName:string): Promise<string> {
         const tags = ["Empower", "Facilitate", "card", "matrix", "Testing", "Evolve schemas"];
         const randomIndex = Math.floor(Math.random() * tags.length); // Corrected random index generation
         const randomTag = tags[randomIndex];
         await this.click(this.selectors.searchButton, "Tagname", "Field")
         await this.keyboardType(this.selectors.selectTagnames, "Tagname")
         console.log(randomTag)
         return tagName;
     } */
    async selectresultantTags(tagName: string) {
        await this.wait('minWait');
        await this.click(this.selectors.searchButton, "Tagname", "Field");
        await this.wait('minWait');
        await this.keyboardType(this.selectors.selectTagnames, tagName);
        await this.wait('minWait');
        await this.mouseHover(this.selectors.reultantTagname(tagName), "Tags")
        await this.validateElementVisibility(this.selectors.reultantTagname(tagName), "Tags")
        await this.click(this.selectors.reultantTagname(tagName), "Tags", "selected")
    }
    async clickApply() {
        await this.mouseHover(this.selectors.applyButton, "Apply")
        await this.click(this.selectors.applyButton, "Apply", "Button")
    }
    async viewCoursedetails() {
        await this.click(this.selectors.viewCourseDetails, "Coursedetails", "Button");
        await this.wait('mediumWait');
    }
    async clickViewCertificationDetails() {
        await this.validateElementVisibility(this.selectors.viewCertificationDetailsBtn, "View Certification Details");
        await this.click(this.selectors.viewCertificationDetailsBtn, "View Certification Details", "Button");
        await this.page.waitForLoadState('load');
        await this.wait('mediumWait');
    }
    async clickViewLearningPathDetails() {
        await this.validateElementVisibility(this.selectors.viewlearningPathDetailsBtn, "View Learning Path Details");
        await this.click(this.selectors.viewlearningPathDetailsBtn, "View Learning Path Details", "Button");
        await this.page.waitForLoadState('load');
    }
    async clickOkButton() {
        await this.validateElementVisibility(this.selectors.okBtn, "View Certification Details");
        await this.click(this.selectors.okBtn, "View Certification Details", "Button");
        await this.page.waitForLoadState('load');

    }
    async verifyAddedToCart() {
        await this.validateElementVisibility(this.selectors.addedToCartBtn, "Added to Cart");
        await this.verification(this.selectors.addedToCartBtn, "Added to Cart")
    }

    async clickContentLaunchButton() {
        await this.mouseHover(this.selectors.contentLaunchBtn, "Launch");
        await this.click(this.selectors.contentLaunchBtn, "Launch", "Button");
        await this.spinnerDisappear();
    }

    async clickViewCertificate() {
        await this.mouseHover(this.selectors.viewCertificateBtn, "View Certificate");
        await this.click(this.selectors.viewCertificateBtn, "View Certificate", "Button");
        await this.wait('minWait')

    }

    public async addToCart() {
        await this.validateElementVisibility(this.selectors.addToCart, "Add to cart");
        await this.wait('mediumWait');
        await this.click(this.selectors.addToCart, "Add to cart", "Button");
    }

    public async clickShoppingCartIcon() {
        await this.mouseHover(this.selectors.shoppingCardIcon, 'Shopping Cart Icon');
        await this.click(this.selectors.shoppingCardIcon, 'Shopping Cart Icon', "Icon");
    }

    public async clickProceedToCheckout() {
        await this.validateElementVisibility(this.selectors.proceedToCheckoutBtn, "Proceed To Checkout");
        await this.click(this.selectors.proceedToCheckoutBtn, "Proceed To Checkout", "Button");
    }

    public async handlingAdditionalContents() {
        await this.mouseHover(this.selectors.contentsLabel, "Contents");
        await this.click("", "", "")
    }


    public async verifyCourse(courseName: string) {
        const result = await this.getInnerText(this.selectors.resultNotFound);
        expect(result).not.toContain(courseName);
    }

    public async writeContent() {
        await this.wait('mediumWait');
        let checkBox = this.page.locator(this.selectors.checkBox);
        let checkBoxCount = await checkBox.count();
        let radioIcon = this.page.locator(this.selectors.RadioBtn);
        let radioIconCount = await radioIcon.count();
        let dropdown = this.page.locator(this.selectors.assessmentDropdown);
        let dropDownCount = await dropdown.count();
        let dropdownValue = this.page.locator("[id^='wrapper-ques'] a");
        let input = this.page.locator(this.selectors.questionInput);
        let inputCount = await input.count();
        let starIcon = this.page.locator(this.selectors.starIcon)
        let starIconCount = await starIcon.count();
        await this.wait('mediumWait');
        if (await checkBox.nth(0).isVisible()) {
            for (let index = 0; index < checkBoxCount; index++) {
                if (index % 2 == 0) {
                    await checkBox.nth(index).click();
                }
            }
        }

        await this.wait('minWait');
        if (await radioIcon.nth(0).isVisible()) {
            for (let index = 0; index < radioIconCount; index++) {
                if (index % 2 == 0) {
                    await radioIcon.nth(index).click();
                }
            }
        }
        await this.wait('minWait');
        if (await dropdown.nth(0).isVisible()) {
            let printedIndices: number[] = [];
            for (let i = 0; i < dropDownCount; i++) {
                await dropdown.nth(i).click();
                for (let index = 0; index < await dropdownValue.count(); index++) {
                    if (index % 2 === 0) {
                        if (!printedIndices.includes(index)) {
                            printedIndices.push(index);
                            await dropdownValue.nth(index).click();
                            break;
                        }

                    }
                }
            }
        }
        await this.wait('minWait');
        if (await input.nth(0).isVisible()) {
            for (let index = 0; index < inputCount; index++) {
                await input.nth(index).fill(FakerData.getDescription());
            }
        }
        await this.wait('minWait');
        if (await starIcon.nth(0).isVisible()) {
            let clickIndices: number[] = [];
            for (let i = 0; i < starIconCount; i++) {
                clickIndices.push((i * 5) + 4);
                for (let index of clickIndices) {
                    if (index < 15) {
                        starIcon.nth(index).click();

                    }
                }
            }


        }
    }
    async surveyPlayButton() {
        await this.click(this.selectors.surveyPlayBtn, "Survey", "Button");
    }
    async submitMyAnswer() {
        let submitBtn = this.page.locator(this.selectors.submitMyAnswerBtn);
        let surveySubmitBtn = this.page.locator(this.selectors.submitSurveyBtn);
        let scoreVisible = this.page.locator(this.selectors.recievedScore);
        if (await submitBtn.isVisible()) {
            await this.click(this.selectors.submitMyAnswerBtn, "Submit My Answer", "Button");
            await this.wait(`mediumWait`);
            if (await scoreVisible.isVisible()) {
                let score = await this.getInnerText(this.selectors.recievedScore)
                console.log(score);
            }
            await this.wait(`minWait`);
            await this.click(this.selectors.doneBtn, "Done", "Button");
        }

        if (await surveySubmitBtn.isVisible()) {
            await this.click(this.selectors.submitSurveyBtn, "Survey", "Button");
            await this.wait(`minWait`);
        }
    }
    

}
