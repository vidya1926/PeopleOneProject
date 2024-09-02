import { Page, BrowserContext, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData } from "../utils/fakerUtils";


export class AdminRolePage extends AdminHomePage {
    static pageUrl = URLConstants.adminURL;

    public selectors = {
        ...this.selectors,
        addAdminrole: `//button[text()='ADD ADMIN ROLE']`,
        adminroleName: `#role_name`,
        moduleName: (index: number) => `(//span[@class='pointer text-truncate'])[${index}]`,
        additonalModuleName: (index: number) => `(//span[@class='text-truncate'])[${index}]`,
        deleteIcon: (module: string) => `(//label[@for='${module}-delete']//i)[2]`,
        saveButton:`#role-meta-data-save`,
        createdRole:`//div[contains(@id,'role_name')]/span`

    };
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async clickAddAdminRole() {
        await this.click(this.selectors.addAdminrole, "Add AdminRole", "Button")
    }

    public async enterName(roleName:string) {
        await this.type(this.selectors.adminroleName, "Admin Role Name",roleName)
    }

    public async clickAllPriveileges() {
        await this.wait('mediumWait')
        const count = await this.page.locator(`//span[contains(@class,'pointer text-truncate')]`).count()
        for (let index = 1; index <= count; index++) {
            const text = await this.getInnerText(this.selectors.moduleName(index));
            const modName = text.toLowerCase()
            const textValue = modName.charAt(0).toUpperCase() + modName.slice(1);
            await this.click(this.selectors.deleteIcon(textValue), `${text}`, "Delete Checkbox")
        }
        const countMod = await this.page.locator(`//span[@class='text-truncate']`).count()
        console.log(countMod)
        for (let index = 1; index <= countMod; index++) {
            const text = await this.getInnerText(this.selectors.additonalModuleName(index));
                     if(text.length>4){
                const words = text.split(" "); 
                const formattedText = words.map((word, index) => {
                  if (index === 2) {
                       return word.toUpperCase();
                  } else {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                  }
                }).join(" "); 
             await this.click(this.selectors.deleteIcon(formattedText), `${formattedText}`, "Delete Checkbox")
            }
            else{
                await this.click(this.selectors.deleteIcon(text), `${text}`, "Delete Checkbox")
            }
        }
    }

        public async clickSave(){
                await this.click(this.selectors.saveButton,"Save","Button")
        }

        public async verifyRole(roleName:string){
            await this.verification(this.selectors.createdRole,roleName)
        }


}




