import { LearnerLogin } from "./LearnerLogin";
import { BrowserContext, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/credentialConstants";
import { CatalogPage } from "./CatalogPage";

export class LearnerCoursePage extends CatalogPage {

    public selectors = {
        ...this.selectors,
        contentPlay_1: `//span[contains(text(),'Content')]/following::i[contains(@class,'fa-duotone fa-circle-play pointer')][1]`,
        contentPlay_2: `//span[contains(text(),'Content')]/following::i[contains(@class,'fa-duotone fa-circle-play pointer')][2]`,
        //warningMessage:
        saveLearning: `//button[text()='Save Learning Status']`,
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);

    }

    async clickfirstContent() {
        await this.click(this.selectors.contentPlay_1, "SecondVideoContent", "Clicked")
    }


    async clicksecondContent() {
        await this.click(this.selectors.contentPlay_2, "SecondVideoContent", "Clicked")
    }


    async verifyWarningmessage() {
        //Video Sequence issue..
    }

    async clickSaveLearning() {
        await this.click(this.selectors.saveLearning, "SaveLearning", "Button")

    }


    
}