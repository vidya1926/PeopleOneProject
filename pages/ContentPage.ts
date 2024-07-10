import { BrowserContext, expect, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";

export class ContentHomePage extends AdminHomePage {
    public fileName: string
    public path: string

    public selectors = {
        ...this.selectors,
        contentButton: `//button[text()='CREATE CONTENT']`,
        contetntTitle: `//input[@id='content-title']`,
        contentDesc: `//div[@id='content_description']//p`,
        addContent: `//label[text()='Click here']/following::input[@type='file']`,
        contentPreview: (index: number) => `(//a/following::i[@aria-label='Preview'])[${index}]`,
        contentType: `//div[@id='wrapper-content_type']//div[@class='filter-option-inner-inner']`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.fileName = "AICC File containing a PPT - Storyline 11"
        this.path = `../data/${this.fileName}.zip`
    }

    public async clickCreateContent() {
        await this.click(this.selectors.contentButton, "CreateContent", "Button")
    }

    public async enterTitle(title: string) {
        await this.type(this.selectors.contetntTitle, "Content title", "text field")
    }

    public async enterDescription(title: string) {
        await this.type(this.selectors.contentDesc, "Content Description", "text field")
    }

    public async uploadContent() {
        await this.wait("mediumWait")
        await this.uploadFile(this.selectors.addContent, this.path)
    }

    public async verifyContentType() {

        await this.wait("maxWait")
        await this.validateElementVisibility(this.selectors.contentType, "Conteytype Text file")
        const text = await this.getInnerText(this.selectors.contentType)
        if ( text== "SCROM") {
            await this.wait("maxWait")
            expect(this.fileName).toContain(text)
        }else if(this.fileName=="AICC"){}
    }

    public async clickandVerifyPreview() {
        const index = await this.page.locator("//span[text()='circuit']/following::i").count()
        const randomIndex = Math.floor(Math.random() * index) + 1;
        const title = await this.focusWindow(this.selectors.contentPreview(randomIndex))
        await this.wait("mediumWait")
        expect(this.fileName).toContain(title)
        console.log(title)
    }

    public async verifyFileType() {


    }



}