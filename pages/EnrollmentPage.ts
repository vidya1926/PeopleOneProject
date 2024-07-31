import { BrowserContext, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";


export class EnrollmentPage extends AdminHomePage{
   
    public selectors = {
        ...this.selectors,
             manageEnrollement:`(//div[@id='wrapper-enrollment-action']//div)[1]`,
             enrollType:`//span[text()='Enroll']`,
             searchcourseOrUser:`//input[contains(@id,'exp-search')]`,
             courseList:`//div[contains(@id,'exp-search')]//li`,
             selectCourse:(index:number)=>`(//label[contains(@for,'training')]//i)[${index}]`,
             selectUser:(index:number)=>`(//div[contains(@id,'exp-search')]//li)[${index}]`,
             selectUserToenroll:"(//input[contains(@id,'selectedlearners')]/following::i)[2]",
             enrollBtn:"//button[text()='Enroll']",
             selectedLearners:`//button[text()='Select Learner']`,
             toastMeassage:`//section[contains(@class,'lms-success-msg-wrapper')]//h3`
             
        };

    
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async selectEnroll(){
        await this.click(this.selectors.manageEnrollement,"Manage Enrollment " ,"Dropdown")
        await this.click(this.selectors.enrollType,"Manage Enrollment " ," EnrollLink")
         
    }

    async SelecCourse(data:string){
        await this.type(this.selectors.searchcourseOrUser,"Search user", data)
        const count=await this.page.locator("//label[contains(@for,'training')]//i").count()
        const randomIndex = Math.floor(Math.random() * count) + 1;
        await this.click(this.selectors. selectCourse(randomIndex),"Select Course","Option")
        await this.click(this.selectors.selectUserToenroll,"Select User","Radio button")

    }

    async clickSelectedLearner(){
        await this.click(this.selectors.selectedLearners,"Select Learners","Button")

    }
    async enterSearchUser(data:string){
        await this.type(this.selectors.searchcourseOrUser,"Search user", data)
        await this.validateElementVisibility(this.selectors.courseList,"Select course/User")
        const count=await this.page.locator("(//div[contains(@id,'exp-search')]//li)").count()
        const randomIndex = Math.floor(Math.random() * count) + 1;
        await this.validateElementVisibility(this.selectors.selectUser(randomIndex),"Select User")
        await this.click(this.selectors.selectUser(randomIndex),"Select User","Option")
        await this.click(this.selectors.selectUserToenroll,"Select User","Radio button")
    }

    async clickEnrollBtn(){
        await this.click(this.selectors.enrollBtn,"Enroll","Button")
    }
    async verifytoastMessage(){
        await this.verification(this.selectors.verifytoastMessage,"Enrollment")
    }



}    