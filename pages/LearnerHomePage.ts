import { LearnerLogin } from "./LearnerLogin";
import { BrowserContext, expect, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/credentialConstants";

export class LearnerHomePage extends LearnerLogin {
    static pageUrl = URLConstants.leanerURL;

    public selectors = {

        signOutLink: "//div[@class='logout']/a",
        catalogLink: `//a//span[text()='Catalog']`,
        myLearningLink: "//a//span[text()='My Learning']",
        myDashboardLink: "//a//span[text()='My Dashboard']",
        img: (index: number) => `(//div[@class='w-100 col']//img)[${index}]`,
        bannerTitle: (titleName: string) => `//div/h1[text()='${titleName}']`,
        bannerImg: (titleName: string) => `(//div/h1[text()="${titleName}"]/ancestor::div/img)[2]`,
        bannerSlider: `//a[@id='banner-carousel-expcarousel-right-btn']`,
        sequenceCounter: `(//div[@class='carousel__viewport']//div[contains(@class,'col pointer')])[1]`,       // Add more selectors as needed
        bannerName: `(//div[contains(@class,'col pointer')]//h1)[1]`,
        announcementIcon:`//div[@id='announcementspopover']`,
        announcementName:(index:number)=>`(//div[@id='announcements']//p)[${index}]`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.common(page, context).catch(err => console.error("Error in common setup:", err));
    }

    private async common(page: Page, context: BrowserContext) {
        await this.loadApp(LearnerHomePage.pageUrl);
        // let pageTitle = await this.getTitle();
        // console.log("Page Title:", pageTitle);
        const inLogin = new LearnerLogin(page, context);
        await inLogin.learnerLogin(credentialConstants.LEARNERUSERNAME, credentialConstants.PASSWORD);
    }
    public async isSignOutVisible() {
        await this.page.waitForLoadState('load');
        await this.validateElementVisibility(this.selectors.signOutLink, "Sign Out");
    }
    public async clickCatalog() {
        await this.page.waitForLoadState('networkidle');
        await this.validateElementVisibility(this.selectors.catalogLink, "Catalog");
        await this.mouseHover(this.selectors.catalogLink, "Catalog");
        await this.click(this.selectors.catalogLink, "Catalog", "Link");
        await this.page.waitForLoadState('load');
    }
    public async clickMyLearning() {
        await this.validateElementVisibility(this.selectors.myLearningLink, "Link");
        await this.click(this.selectors.myLearningLink, "My Learning", "Link");
        await this.page.waitForLoadState('load');
    }
    public async clickDashboardLink() {
        await this.validateElementVisibility(this.selectors.myDashboardLink, "Link");
        await this.click(this.selectors.myDashboardLink, "My Learning", "Link");
        await this.page.waitForLoadState('load');
    }

    public async verifyImage(title: string) {
        const banner = this.page.locator(`//div/h1[text()="${title}"]/ancestor::div/img`)
            await this.wait("minWait")
        if (await banner.isVisible()) {
            const name = await this.getInnerText(this.selectors.bannerName)
            expect(name).toContain(title)
        } else {
             let attempt=0;             
             let maxattempt=await this.page.locator("//div[contains(@class,'col pointer')]//h1").count();
            while (attempt<maxattempt) {
                this.validateElementVisibility(this.selectors.bannerSlider, "banner")
                this.click(this.selectors.bannerSlider, "banner", "Slider")
                if (await banner.isVisible()) {
                    const name = await this.getInnerText(this.selectors.bannerName)
                    expect(name).toContain(title)
                    break;
                }
                 attempt++;          
            }
        }
    }

    public async verifySequence(title: string, seqNumber: number) {
        await this.validateElementVisibility(this.selectors.sequenceCounter, "banner")

        const availaberBnner = await this.page.locator(this.selectors.sequenceCounter).count();
        for (let index = 1; index <= availaberBnner; index++) {
            try {
                if (index == seqNumber) {
                    const name = await this.getInnerText(this.selectors.bannerName)
                    expect(name).toContain(title)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    public async verifyAllSequence(title: string) {
        await this.validateElementVisibility(this.selectors.sequenceCounter, "banner")
        const availaberBnner = await this.page.locator(this.selectors.sequenceCounter).count();
        try {
            for (let index = 1; index <= availaberBnner; index++) {
                const name = await this.getInnerText(this.selectors.bannerName)
                expect(name).toContain(title)
            }
        } catch (error) {
            console.log(error)
        }
    }

    public async verifyUrl(title:string) {
            await this.click(this.selectors.bannerImg(title),"Navigate the Url", "Link")        
            expect(await this.getTitle()).toContain("E1Internal")
    }


    public async verifyAnnouncement(){
        await this.wait("minWait")
        await this.mouseHover(this.selectors.announcementIcon,"Announcement")
        await this.click(this.selectors.announcementIcon,"Announcement","Icon")
        const index=await this.page.locator("//div[@id='announcements']//p").count();
        const randomIndex = Math.floor(Math.random() *  index)+ 1;
        await this.getInnerText(this.selectors.announcementName(randomIndex));

    }


}
