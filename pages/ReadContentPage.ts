import { CatalogPage } from "./CatalogPage";

export class ReadContentPage extends CatalogPage {

    public selectors = {
        ...this.selectors,
        contentframeEle: `//frame[@name='scormdriver_content']`,
        contentNextbutton: `//div[text()='NEXT']`,
        contentPage: `//li[contains(@class,'open visited')]`,
        contentFrame: `//iframe[contains(@class,'url-content-frame')]`,
        playForwardButton: `//div[@id='playbar']//*[@title='Forward']`,

    };
    async readPPtContent() {
        await this.wait("minWait")
        await this.verifyEleinFrame(this.selectors.contentframeEle, this.selectors.contentPage, "Thank you Link")
        const count = await this.page.locator(this.selectors.contentPage).count()
        for (let index = 1; index <= count; index++) {
            await this.wait("minWait")
            await this.click(this.selectors.contentNextbutton, "Next", "Button")
        }
    }

    async readContent() {
        await this.page.pause()
        await this.verifyAndClickEleinFrame(this.selectors.playForwardButton, this.selectors.playForwardButton, "ForwardButton")

    }

    async saveLearningAICC() {
        await this.click(this.selectors.saveLearningStatus, "save", "button");
        const completed = this.page.locator(this.selectors.completedVideo);
        try {
            if (await completed.isVisible()) {
                console.log("Task Completed");
            }
        } catch (error) {
            await this.readPPtContent();
            await this.saveLearningAICC()
        }
    }






}