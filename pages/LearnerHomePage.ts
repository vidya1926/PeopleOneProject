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
        catalogLabel: "//div//h1[text()='Catalog']",
        myLearningLink: "//a//span[text()='My Learning']",
        myDashboardLink: "//a//span[text()='My Dashboard']",
        myDashboardLabel: "//div/h1[text()='My Dashboard']",
        img: (index: number) => `(//div[@class='w-100 col']//img)[${index}]`,
        bannerTitle: (titleName: string) => `//div/h1[text()='${titleName}']`,
        bannerImg: (titleName: string) => `(//div/h1[text()="${titleName}"]/ancestor::div/img)[1]`,
        bannerimgLink: (titleName: string) => `(//div/h1[text()="${titleName}"]/ancestor::div/img[contains(@src,'/resources/')])[1]`,
        bannerSlider: `//a[@id='banner-carousel-expcarousel-right-btn']`,
        sequenceCounter: `(//div[@class='carousel__viewport']//div[contains(@class,'col pointer')])[1]`,       // Add more selectors as needed
        bannerName: `(//div[contains(@class,'col pointer')]//h1)[1]`,
        announcementIcon: `//div[@id='announcementspopover']`,
        announceNotify: `div[class^='announcement'] p`,
        announcementName: (title: string) => `(//div[@id='announcements']//p[text()='Announcement !!!  ${title}'])[1]`,
        adminmenuIcon: `//i[@id='adminmenu']`,
        collaborationHub: `//a/span[text()='Collaboration Hub']`,
        approveTick: (courseName: string) => `//span[text()='${courseName}']/following::i[contains(@id,'approve')][1]`,
        proceedBtn: `//button[text()='Proceed']`,
        verifyOrder: `//div[contains(@class,'information_text ')]`,
        searchfield: `//input[@id='exp-searchapproval-search-field']`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async loadLearner(role: string, url: any) {
        await this.learnerLogin(role, url)
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
        await this.mouseHover(this.selectors.catalogLabel, "Catalog Label");
        await this.wait('minWait');
    }
    public async clickMyLearning() {
        await this.validateElementVisibility(this.selectors.myLearningLink, "Link");
        await this.click(this.selectors.myLearningLink, "My Learning", "Link");
        await this.page.waitForLoadState('load');
    }
    public async clickDashboardLink() {
        await this.validateElementVisibility(this.selectors.myDashboardLink, "Link");
        // await this.mouseHover(this.selectors.myDashboardLink, "Link");
        await this.click(this.selectors.myDashboardLink, "My Learning", "Link");
        await this.mouseHover(this.selectors.myDashboardLabel, "My Dashboard");
        await this.verification(this.selectors.myDashboardLabel, "My Dashboard");
    }

    public async verifyImage(title: string) {
        const banner = this.page.locator(`(//div/h1[text()="${title}"]/ancestor::div/img)[1]`)
        await this.wait("minWait")
        if (await banner.isVisible()) {
            const name = await this.getInnerText(this.selectors.bannerName)
            const eleName = name.toLowerCase();
            expect(eleName).toContain(title)
        } else {
            let attempt = 0;
            let maxattempt = await this.page.locator("//div[contains(@class,'col pointer')]//h1").count();
            while (attempt < maxattempt) {
                this.validateElementVisibility(this.selectors.bannerSlider, "banner")
                this.click(this.selectors.bannerSlider, "banner", "Slider")
                if (await banner.isVisible()) {
                    const name = await this.getInnerText(this.selectors.bannerName)
                    const eleName = name.toLowerCase();
                    expect(eleName).toContain(title)
                    break;
                }
                attempt++;
            }
        }
    }

    public async verifyBannerDisplay(title: string) {
        const banner = this.page.locator(`(//div/h1[text()="${title}"]/ancestor::div/img)`)
        await this.wait("minWait")
        if (await banner.isVisible()) {
            const name = await this.getInnerText(this.selectors.bannerName)
            const eleName = name.toLowerCase();
            expect(eleName).not.toContain(title)
        } else {
            let attempt = 0;
            let maxattempt = await this.page.locator("//div[contains(@class,'col pointer')]//h1").count();
            while (attempt < maxattempt) {
                this.validateElementVisibility(this.selectors.bannerSlider, "banner")
                this.click(this.selectors.bannerSlider, "banner", "Slider")
                if (await banner.isVisible()) {
                    const name = await this.getInnerText(this.selectors.bannerName)
                    const eleName = name.toLowerCase();
                    expect(eleName).not.toContain(title)
                    break;
                }
                attempt++;
            }
        }
    }


    public async verifySequence(title: string, seqNumber: number) {
        const bannerEle = this.page.locator("//div[contains(@class,'col pointer')]//h1")
        const sequenceCount = await bannerEle.count();
        expect(sequenceCount).toBeGreaterThanOrEqual(2);
        const secondElement = bannerEle.nth(1)
        console.log(await secondElement.innerText())
        // Verify that the second element is visible
        const banner = await secondElement.isVisible();
        expect(banner).toBe(true);
        // for (let index = 1; index <= sequenceCount; index++) {
        //     try {
        //         if (index == seqNumber) {
        //             const name = await this.getInnerText(this.selectors.bannerName)
        //             expect(name).toContain(title)
        //         }
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }

        // await this.validateElementVisibility(this.selectors.sequenceCounter, "banner")
        // const availaberBnner = await this.page.locator(this.selectors.sequenceCounter).count();
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

    public async verifyUrl(title: string) {
        await this.verifyAllSequence(title)
        const srcUrl = await this.fetchattribute(this.selectors.bannerImg(title), 'src')
        await this.page.waitForLoadState();
        await this.focusWindow(this.selectors.bannerimgLink(title))
    }


    async verifyAnnouncement(title: string) {
        await this.wait("minWait")
        await this.mouseHover(this.selectors.announcementIcon, "Announcement")
        await this.click(this.selectors.announcementIcon, "Announcement", "Icon")
        const annocement = await this.page.locator(this.selectors.announcementName(title)).textContent();
        expect(annocement).toContain(`${title}`)
    }
    async verifyPastAnnouncement(title: string) {
        await this.wait("minWait");
        await this.mouseHover(this.selectors.announcementIcon, "Announcement");
        await this.click(this.selectors.announcementIcon, "Announcement", "Icon");
        await this.wait('mediumWait');
        const annocement = await this.page.locator(this.selectors.announceNotify).allTextContents();
        expect(annocement).not.toContain(title);

    }

    /* async verifypastAnnouncement(title: string) {
        await this.wait("minWait")
        await this.mouseHover(this.selectors.announcementIcon, "Announcement")
        await this.click(this.selectors.announcementIcon, "Announcement", "Icon")
        const annocement = await this.getInnerText(this.selectors.announcementName(title));
        expect(annocement).not.toContain(`${title}`)
    } */


    async selectCollaborationHub() {
        await this.click(this.selectors.adminmenuIcon, "Admin Menu", "Icon")
        await this.validateElementVisibility(this.selectors.collaborationHub, "CH")
        await this.click(this.selectors.collaborationHub, "CH", "Option")
    }

    async clickApprove(courseName: string) {
        await this.click(this.selectors.approveTick(courseName), "Approve Course", "Icon")
    }

    async searchApprovalCourse(courseName: string) {
        await this.type(this.selectors.searchfield, "Search Field", courseName);
        await this.keyboardAction(this.selectors.searchfield, "Enter", "Input", "Search Field");
        await this.wait('mediumWait')
    }

    async proceedAndVerify() {
        await this.click(this.selectors.proceedBtn, "Proceed", "Button"),
            await this.wait("mediumWait")
        await this.verification(this.selectors.verifyOrder, "Order Placed")
    }

}