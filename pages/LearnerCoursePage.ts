import { BrowserContext, Page } from "@playwright/test";
import { CatalogPage } from "./CatalogPage";

export class LearnerCoursePage extends CatalogPage {

    public selectors = {
        ...this.selectors,
        contentPlaySeq: `//span[contains(text(),'Content')]/following::i[contains(@class,'fa-duotone fa-circle-play pointer')]`,
        //warningMessage:

    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async clickContents() {
        const videoSeq = this.selectors.contentPlaySeq
        const length = this.selectors.contentPlaySeq.count();
        try {
            for (let index of length) {
                await this.click(this.selectors.contentPlaySeq(index), "All contents", "Checkbox")
            }
        } catch {
            //verify warning message
        }
    }
    async clickFirstContent() {

    }

    async clickSaveLearning() {
        await this.click(this.selectors.saveLearning, "SaveLearning", "Button")

    }



}