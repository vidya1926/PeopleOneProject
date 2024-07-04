import { BrowserContext, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";


export class CommerceHomePage extends AdminHomePage{
    static pageUrl = URLConstants.adminURL;
    public selectors = {
        ...this.selectors,
             orderLink:`//a[text()='Order']`,
             approveOrder:`//i[@aria-label='Approve Payment']`,
             yesBtn:`//button[text()='Yes']`
        };

    
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    
   public async clickOrder(){
        this.click(this.selectors.orderLink,"Order","Link")
    }

    
   public async approveOrder(){
      await this.validateElementVisibility(this.selectors.approveOrder,"Approve Order")
      await this.click(this.selectors.approveOrder,"Approve Order","Tick")
      await this.click(this.selectors.yesBtn,"Yes","Buttton")
   }









}

