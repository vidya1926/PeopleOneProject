import { expect } from "@playwright/test";
import { FakerData } from "../utils/fakerUtils";
import { LearnerHomePage } from "./LearnerHomePage";


export class ManagerPage extends LearnerHomePage {

    public selectors = {
        ...this.selectors,
       searchCourse:`//input[@id='exp-searchcatalog-search-field']`,
       recommendIcon:(courseName:string)=>`(//div[text()='${courseName}']/following::i)[1]`,
       directandIndirect:(option:string)=>`(//span[text()='${option} Report']/preceding-sibling::i)[1]`,
       additionalInfo:`//textarea[@id='email-message']`,
       sendMeCopy:`(//span[text()='Send me a copy']/preceding-sibling::i)[2]`,
       recommendLearning:`//span[text()='Recommend Learning']`,
       toastmessage:`//span[text()='Recommended successfully']`,
       okButton:`(//span[text()='Recommended successfully']/following::button)[1]`
    }

    async enterSearchCourse(data:string){
        await this.keyboardType(this.selectors.searchCourse,data)
    }

    async clickrecommendIcon(data:string){
        await this.click(this.selectors.recommendIcon(data),"Recommend Course","Icon")
    }

    async verifydirectandIndirect(data:string){
      const selected=  await this.page.locator(this.selectors.directandIndirect(data)).isChecked()
      expect(selected).toBeTruthy()
    }

    async enterAdditionalInfo(){
        await this.keyboardType(this.selectors.additionalInfo,FakerData.getDescription())
    }
   
    async clickSendMeCopy(){
        await this.click(this.selectors.sendMeCopy,"Send Me Copy ","Button")
    }
    async clickRecommendLearning(){
        await this.click(this.selectors.recommendLearning,"RecommendLearning ","Button")
    }

    async verifytoastmsg(){
        
        await this.verification(this.selectors.toastmessage,"successfully")
        await this.wait('maxWait')
        await this.validateElementVisibility(this.selectors.okButton,"Ok Button")
        await this.click(this.selectors.okButton,"Ok","Button")
        
    }

}
