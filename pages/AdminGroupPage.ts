import { Page, BrowserContext } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright"


export class AdminGroupPage extends PlaywrightWrapper {
    static pageUrl = URLConstants.adminURL;

    public selectors = {
        clickAdminGroup:(user:string)=> `//div[text()='${user}']`,
        searchUser: "#includeLearner-filter-field",      
        chooseUser:(user:string)=>`//li[text()=${user}]`,
        //(username:string)=>`//span[text()=${username}]/following::i[contains(@class,'fa-square icon')][1]
        selectUser:`//div[contains(@class,'custom-control custom-chkbox')][2]`,
        clickSelectUser:`//button[text()='Select Users']`,
        selectUpdate:`//button[text()='Update']`,
        searchCustomerAdmin:`//button[text()='CREATE GROUP']/following::input[1]`,
        selectPopup:`//li[text()='Super admin - Customer']`,
    }

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    
    public async searchCustomeradmin(admin:string){
        await this.type(this.selectors.searchCustomerAdmin,"Search Admin", admin)
        await this.mouseHoverandClick(this.selectors.selectPopup,this.selectors.selectPopup,"POP up ","option")
    }
    public async clickSuperadminCustomer() {
        await this.click(this.selectors.clickAdminGroup("Super admin - Customer"), "Customer Admin", "Button")
    }

    public async clickLearningAdmin(){
        await this.click(this.selectors.clickAdminGroup("Learning admin"), "Customer Admin", "Button")
    }
    public async searchUser(data: string) {
        await this.typeAndEnter(this.selectors.searchUser, "Search User", data)
    
    }
    public async clickuserCheckbox(username:string) {
        await this.validateElementVisibility(this.selectors.selectUser,username)
        await this.clickCheckbox(this.selectors.selectUser,username)
          }

    public async clickSelelctUsers() {
        await this.click(this.selectors.clickSelectUser,"Username","Checkbox ")
    }

    public async clickUpdate(){
        await this.click(this.selectors.selectUpdate,"Update", "Button")
    }



}