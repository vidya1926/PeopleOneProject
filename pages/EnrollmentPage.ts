import { BrowserContext, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";
import { FakerData } from "../utils/fakerUtils";


export class EnrollmentPage extends AdminHomePage{
   
    public selectors = {
        ...this.selectors,
             manageEnrollement:`(//div[@id='wrapper-enrollment-action']//div)[1]`,
             enrollType:`//span[text()='Enroll']`,
             searchcourseOrUser:`//input[contains(@id,'exp-search')]`,
             courseList:`//div[contains(@id,'exp-search-lms')]//li`,
             courseListOpt:(index:number)=>`(//div[contains(@id,'exp-search-lms')]//li)[${index}]`,
             userList:`(//div[contains(@id,'lms-scroll-results')]//li)`,
             userListOpt:(index:number)=>`(//div[contains(@id,'lms-scroll-results')]//li)[${index}]`,
             selectCourse:`(//input[contains(@id,'training')]/following::i)[1]`,
             selectedLearners:`//button[text()='Select Learner']`,
             selectUser:`(//input[contains(@id,'selectedlearners')]/following::i)[2]`,
             enrollBtn:"//button[text()='Enroll']",          
             toastMeassage:`//section[contains(@class,'lms-success-msg-wrapper')]//h3`,
             enrollStatus: `(//div[contains(@id,'wrapper-enrollment-action')])[2]`,
             enrollORCancel:(data:string)=>`//span[text()='${data}']`,
             reaonDesc:`//textarea[@id='check_box_msgsenrollmentviewstatususer']`,
             submitReason:`//button[text()='Submit']`,
            saveStatus:`//button[text()='Save']`,

             
        };

    
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async selectEnroll(){
        await this.click(this.selectors.manageEnrollement,"Manage Enrollment " ,"Dropdown")
        await this.click(this.selectors.enrollType,"Manage Enrollment " ," EnrollLink")
         
    }

    async selctBycourse(data:string){
           await this.type(this.selectors.searchcourseOrUser,"Course Name",data)
          const index= await this.page.locator("//div[contains(@id,'lms-scroll-results')]//li").count();
          const randomIndex = Math.floor(Math.random() * index) + 1;
          await this.click(this.selectors.courseListOpt(randomIndex),"Course","Options")
          await this.click(this.selectors.selectCourse,"Select Course","Radio button")

    }
    async clickSelectedLearner(){
        await this.click(this.selectors.selectedLearners,"Select Learners","Button")

    }
    async enterSearchUser(data:string){
        await this.type(this.selectors.searchcourseOrUser,"Course Name",data)
        const index= await this.page.locator("//div[contains(@id,'lms-scroll-results')]//li").count();
        const randomIndex = Math.floor(Math.random() * index) + 1;
        await this.click(this.selectors.userListOpt(randomIndex),"Course","Options")
        await this.click(this.selectors.selectUser,"Select Course","Radio button")
    }
    async clickEnrollBtn(){
        await this.click(this.selectors.enrollBtn,"Enroll","Button")
    }
    async verifytoastMessage(){
        await this.verification(this.selectors.toastMeassage,"Enrollment")
    }
    async selectEnrollOrCancel(data:string){
        await this.click(this.selectors.enrollStatus,"Enroll Status","Dropdown")
        await this.click(this.selectors.enrollORCancel(data),"Enroll Status","Option")
    }

    async enterReasonAndSubmit(){
        await this.type(this.selectors.reaonDesc,"Enroll Status",FakerData.getDescription())
        await this.click(this.selectors.submitReason,"Submit","button")
        await this.click(this.selectors.saveStatus,"Submit","button")
    }
   

}    