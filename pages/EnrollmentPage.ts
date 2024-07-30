import { BrowserContext, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";


export class EnrollmentPage extends AdminHomePage{
    static pageUrl = URLConstants.adminURL;
    public selectors = {
        ...this.selectors,
             manageEnrollement:`(//div[@id='wrapper-enrollment-action']//div)[1]`,
             enrollType:`//span[text()='Enroll']`,
             searchUser:`//input[contains(@id,'exp-search')]`,
             selectUser:(index:number)=>`(//div[contains(@id,'exp-search')]//li)[${index}]`,
             selectUserToenroll:"(//input[contains(@id,'selectedlearners')]/following::i)[2]",
             EnrollBtn:"//button[text()='Enroll']",
             toastMeassage:`//section[contains(@class,'lms-success-msg-wrapper')]//h3`
             
        };

    
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    async selectEnroll(){
        await this.click(this.selectors.manageEnrollement,"Manage Enrollment " ,"Dropdown")
        await this.click(this.selectors.enrollType,"Manage Enrollment " ," EnrollLink")
         
    }



}    