import { BrowserContext, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";


export class CommerceHomePage extends AdminHomePage{
    static pageUrl = URLConstants.adminURL;
    public selectors = {
        ...this.selectors,
             orderLink:`//a[text()='Order']`,
    };

    
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    
   public async clickOrder(){
        this.click(this.selectors.orderLink,"Order","Link")
    }

    
   public async approveOrder(){
    
   }









}

