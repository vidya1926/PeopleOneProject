import { LearnerLogin } from "./LearnerLogin";
import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/credentialConstants";
import { PlaywrightWrapper } from "../utils/playwright";

export class LearnerHomePage extends LearnerLogin {
    static pageUrl = URLConstants.leanerURL;

    public selectors = {

        signOutLink: "//div[@class='logout']/a",
        catalogLink: `//a//span[text()='Catalog']`,
        myLearningLink: "//a//span[text()='My Learning']",
        myDashboardLink: "//a//span[text()='My Dashboard']",
        img: (index: number) => `(//div[@class='w-100 col']//img)[${index}]`,
        bannerTitle: (titleName: string) => `//div/h1[text()='${titleName}']`,
        bannerImg: (titleName: string) => `(//div/h1[text()="${titleName}"]/ancestor::div/img)[1]`,
        bannerimgLink:(titleName: string)=>`(//div/h1[text()="${titleName}"]/ancestor::div/img[contains(@src,'/resources/')])[1]`,
        bannerSlider: `//a[@id='banner-carousel-expcarousel-right-btn']`,
        sequenceCounter: `(//div[@class='carousel__viewport']//div[contains(@class,'col pointer')])[1]`,       // Add more selectors as needed
        bannerName: `(//div[contains(@class,'col pointer')]//h1)[1]`,
        announcementIcon:`//div[@id='announcementspopover']`,
        announcementName:(title:string)=>`(//div[@id='announcements']//p[text()='Announcement !!!  ${title}'])[1]`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);

    }

    public async loadLearner(role:string) {
        await this.learnerLogin(role)
        await this.isSignOutVisible()
        
    }
    public async isSignOutVisible() {
        await this.page.waitForLoadState('load');
        await this.validateElementVisibility(this.selectors.signOutLink, "Sign Out");
    }
    public async clickCatalog() {
        await this.page.waitForLoadState('load');
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
        await this.mouseHover(this.selectors.myDashboardLink, "Link");
        await this.click(this.selectors.myDashboardLink, "My Learning", "Link");
        await this.page.waitForLoadState('load');
    }

    public async verifyImage(title: string) {
        const banner = this.page.locator(`(//div/h1[text()="${title}"]/ancestor::div/img)[1]`)
            await this.wait("minWait")
        if (await banner.isVisible()) {
            const name = await this.getInnerText(this.selectors.bannerName)
            const eleName=name.toLowerCase();
            expect(eleName).toContain(title)
        } else {
             let attempt=0;             
             let maxattempt=await this.page.locator("//div[contains(@class,'col pointer')]//h1").count();
            while (attempt<maxattempt) {
                this.validateElementVisibility(this.selectors.bannerSlider, "banner")
                this.click(this.selectors.bannerSlider, "banner", "Slider")
                if (await banner.isVisible()) {
                    const name = await this.getInnerText(this.selectors.bannerName)
                    const eleName=name.toLowerCase();
                    expect(eleName).toContain(title)
                    break;
                }
                 attempt++;          
            }
        }
    }

    public async verifyBannerDisplay(title: string) {
        const banner = this.page.locator(`(//div/h1[text()="${title}"]/ancestor::div/img)[1]`)
            await this.wait("minWait")
        if (await banner.isVisible()) {
            const name = await this.getInnerText(this.selectors.bannerName)
            const eleName=name.toLowerCase();
            expect(eleName).not.toContain(title)
        } else {
             let attempt=0;             
             let maxattempt=await this.page.locator("//div[contains(@class,'col pointer')]//h1").count();
            while (attempt<maxattempt) {
                this.validateElementVisibility(this.selectors.bannerSlider, "banner")
                this.click(this.selectors.bannerSlider, "banner", "Slider")
                if (await banner.isVisible()) {
                    const name = await this.getInnerText(this.selectors.bannerName)
                    const eleName=name.toLowerCase();
                    expect(eleName).not.toContain(title)
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
        const srcUrl= await this.fetchattribute(this.selectors.bannerImg(title),'src')
        await this.page.waitForLoadState();
        await this.focusWindow(this.selectors.bannerimgLink(title))
    }


    public async verifyAnnouncement(title:string ){
        await this.wait("minWait")
        await this.mouseHover(this.selectors.announcementIcon,"Announcement")
        await this.click(this.selectors.announcementIcon,"Announcement","Icon")
        // const index=await this.page.locator("//div[@id='announcements']//p").count();
        // const randomIndex = Math.floor(Math.random() *  index)+ 1;
       const annocement= await this.getInnerText(this.selectors.announcementName(title));
       expect(annocement).toContain(`${title}`)   
    }


}