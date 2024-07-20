import { BrowserContext, Page } from "@playwright/test";
import { CatalogPage } from "./CatalogPage";

export class LearnerCoursePage extends CatalogPage {

    public selectors = {
        ...this.selectors,
        createGroupbtn: `//button[text()='CREATE GROUP']`,
      
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }




}