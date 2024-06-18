import { Page, BrowserContext } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright"


export class AdminGroupPage extends PlaywrightWrapper {
    static pageUrl = URLConstants.adminURL;

    public selectors = {
        superAdminCustomer: "//div[text()='Super admin - Customer']",
        searchUser: "//div[text()='UserName']/following::input[@placeholder='Search']",      
        chooseUser:(user:string)=>`//li[text()=${user}]`,
        //(username:string)=>`//span[text()=${username}]/following::i[contains(@class,'fa-square icon')][1]
        selectUser:`//div[contains(@class,'custom-control custom-chkbox')][2]`,
        clickSelectUser:`//button[text()='Select Users']`,
        selectUpdate:`//button[text()='Update']`
    }

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    public async clickSuperadminCustomer() {
        await this.click(this.selectors.superAdminCustomer, "Customer Admin", "Button")
    }

    public async searchUser(data: string) {
     

        await this.typeAndEnter(this.selectors.searchUser, "Search User", data)
     //   await this.mouseHoverandClick(this.selectors.chooseUser(data),this.selectors.chooseUser(data),"Username","Selected")    }
    }
    public async clickuserCheckbox(username:string) {
        await this.validateElementVisibility(this.selectors.selectUser,"Username")
        await this.clickCheckbox(this.selectors.selectUser,"Username")
          }

    public async clickSelelctUsers() {
        await this.click(this.selectors.clickSelectUser,"Username","Checkbox ")
    }

    public async clickUpdate(){
        await this.click(this.selectors.selectUpdate,"Update", "Button")
       

    }

}