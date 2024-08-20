import { expect } from "@playwright/test";
import { FakerData } from "../utils/fakerUtils";
import { LearnerHomePage } from "./LearnerHomePage";


export class ManagerPage extends LearnerHomePage {

    public selectors = {
        ...this.selectors,
       searchCourse:`//input[@id='exp-searchcatalog-search-field']`,
       recommendIcon:(courseName:string)=>`(//div[text()='${courseName}']/following::i)[1]`,
       directandIndirect:(option:string)=>`(//span[text()='${option}']/preceding-sibling::i)[1]`,
       selectTeamMember:`//span[text()='Select Team members']`,
       additionalInfo:`//textarea[@id='email-message']`,
       sendMeCopy:`(//span[text()='Send me a copy']/preceding-sibling::i)[2]`,
       recommendLearning:`//span[text()='Recommend Learning']`,
       toastmessage:`//span[text()='Recommended successfully']`,
       okButton:`(//span[text()='Recommended successfully']/following::button)[1]`,
       selectDropdown:`//input[@id='select-team-filter-field']`,
       searchUser:`//input[@id='select-team']`,
       teamUseroption:(user:string)=>`//li[text()='${user}']`,
       filter:`//h2[text()='My Team']/following::div[text()='Filters']`,
       selectReportee:(data:string)=>`(//span[text()='${data}']/preceding-sibling::i)[2]`,
       reportee:(reportee:string)=>`(//span[text()='${reportee}'])[1]`

    }
////span[text()='Direct Reportee']/preceding::div[@class='h2_inactive text-capitalize pointer']
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
        await this.click(this.selectors.okButton,"OK", "button")
        }
        async selectTeam(){
           await this.click(this.selectors.selectTeamMember,"Team Memeber","Checkbox")
            
          }

        async selectTeamUser(data:string){
            await this.click(this.selectors.selectDropdown,"Team User","dropdown")
            await this.keyboardType(this.selectors.searchUser,data)
            await this.mouseHover(this.selectors.teamUseroption(data),"Team user Dropdown")
            await this.click(this.selectors.teamUseroption(data),"Team user ","Dropdown")
        }     

        
        
        async verifyReportee(reportee:string){
            await this.validateElementVisibility(this.selectors.reportee(reportee),"Reportee")
            await this.verification(this.selectors.reportee(reportee),"Reportee")    

        }

}
