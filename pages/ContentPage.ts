import { BrowserContext, expect, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";

export class ContentHomePage extends AdminHomePage {
    //public fileName: string
    public path: string

    public selectors = {
        ...this.selectors,
        contentButton: `//button[text()='CREATE CONTENT']`,
        contentTitle: `//input[@id='content-title']`,
        contentDesc: `//div[@id='content_description']//p`,
        addContent: `//label[text()='Click here']/following::input[@type='file']`,
        contentPreview: (index: number) => `(//a/following::i[@aria-label='Preview'])[${index}]`,
        contentType:`//div[@id='wrapper-content_type']//div[@class='filter-option-inner-inner']`,
        contentSearch:`//input[@id='exp-search-field']`,
        storageContent:`//div[@class="col-auto"]/p[contains(text(),'Storage Used')]`,
        contentListing:`//a[text()='Go to Listing']`,
        verifyContentTitle:(title:string)=>`(//div[contains(@class,'field_title_')]/span[text()='${title}'])`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        // this.fileName = "AICC File containing a PPT - Storyline 11.zip"
        // this.path = `../data/${this.fileName}`
    }

    public async clickCreateContent() {
        await this.click(this.selectors.contentButton, "CreateContent", "Button")
    }

    public async enterTitle(title: string) {
        await this.type(this.selectors.contentTitle, "Content title", "text field")
    }

    public async enterDescription(title: string) {
        await this.type(this.selectors.contentDesc, "Content Description", "text field")
    }

    public async uploadContent(fileName:string) {
        this.path = `../data/${fileName}`
        await this.wait("mediumWait")
        await this.uploadFile(this.selectors.addContent, this.path)
        await this.wait("mediumWait")
    }

    public async verifyContentType(fileName:string){
         await this.wait("maxWait")
         await this.validateElementVisibility(this.selectors.contentType,"Conteytype Text file")
         const text= await this.getInnerText(this.selectors.contentType)
         await this.wait("maxWait")
         expect(fileName).toContain(text)
    }

    public async clickandVerifyPreview(fileName:string) {
        const index = await this.page.locator("//span[text()='circuit']/following::i").count()
        const randomIndex = Math.floor(Math.random() * index) + 1;
        const title = await this.focusWindow(this.selectors.contentPreview(randomIndex))
        await this.wait("mediumWait")
        expect(fileName).toContain(title)
        console.log(title)
    }

    public async contentVisiblity(fileName:string){
            await this.type(this.selectors.contentSearch,"File Name", fileName)
            const index = await this.page.locator("//span[text()='circuit']/following::i").count()
            const randomIndex = Math.floor(Math.random() * index) + 1;
            await this.validateElementVisibility(this.selectors.contentPreview(randomIndex),fileName)
            const title= await this.getInnerText(this.selectors.contentPreview(randomIndex));
            expect(fileName).toContain(title)      
        }

    public async verifyFileType(fileName:string){
        await this.wait("maxWait")
         await this.validateElementVisibility(this.selectors.contentType,"Contey type Text file")
         const text= await this.getInnerText(this.selectors.contentType)
         console.log(text)
         await this.wait("maxWait")
         const fileTypes = [
            "doc", "Document", "Presentation", "PPT", "PPS", "Presention",
            "xls", "EXCEL", "pdf", "Pdf", "png", "jpg", "jpeg", "gif",
            "mp4", "mpg", "mp3", "XAPI", "SCORM", "AICC"
        ];        
        expect(fileName).toContain(text);
        }

        public async getContentStorage(){
            await this.wait("maxWait")
            await this.validateElementVisibility(this.selectors.storageContent,"Storage used")
          return await this.getInnerText(this.selectors.storageContent);  
        }
        public async gotoListing(){
            await this.wait('mediumWait')
            await this.validateElementVisibility(this.selectors.contentListing,"Goto Listing")
            await this.click(this.selectors.contentListing,"Goto Listing","Button")
            await this.wait('maxWait')
        }
        

        //     public async getContentTitle(title:string){
        //     await this.validateElementVisibility(this.selectors.verifyContentTitle(title),"Content")
        //     await this.verification(this.selectors.verifyContentTitle(title),title)
        // }

}