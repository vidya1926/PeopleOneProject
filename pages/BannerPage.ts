
import { Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData, getCurrentDateFormatted, getCurrentMonthFormatted } from "../utils/fakerUtils";

export class BannerPage extends AdminHomePage {
    public selectors = {
        ...this.selectors,

        bannerTitle: `//input[@id='banner-title']`,
        bannerDatefield: `//input[@id='banner_from_date-input']`,
        dateFrom: `//td[@class='today day']`,
        dateTo: `//input[@id='banner_to_date-input']`,
        nextButton: `(//th[@class='next'])[1]`,
        sequenceSelect: `//span[text()='Sequence']/following::div[@id='wrapper-banner_sequence']`,
        sequenceOption: `//a[@class='dropdown-item']`,
        sequenceOptionIndex: (index: number) => `(//a[@class='dropdown-item'])[${index}]`,
        clickheretoUpload: `//span[text()='Click here']`,
        uploadFile: `//input[@id='banner_upload_file']`,
        publishButton: `//button[text()='Publish']`,
        bannerUrl: `//input[@id='banner_link']`,
        editBanner: `//a[text()='Edit Banner']`,
        bannerListing: `//a[text()='Go to Listing']`,
        unpublishtab: `//button[text()='Unpublished']`,
        deleteIcon: `(//a[@aria-label="Delete"]/i)[1]`,
        confirmDelete: `//button[text()="Delete"]`,
        editIcon: `(//a[@aria-label='Edit']/i)[1]`,
        updatebtn: `//button[text()='Update']`,
        editSequence:`//span[text()='Sequence']/following::button[@data-id='banner_sequence']`,
        editsequenceindex:`//ul[contains(@class,'dropdown-menu inner')]//a`,
        selectsequenceIndex:(index: number)=>`(//ul[contains(@class,'dropdown-menu inner')]//a)[${index}]`
    };

    public async enterBannerTitile(homePage: string) {
        await this.type(this.selectors.bannerTitle, "BannerTitle", homePage)
    }

    public async enterFromDate() {
        await this.type(this.selectors.bannerDatefield, "From Date", getCurrentDateFormatted())
    }


    public async enterToDate() {
        await this.type(this.selectors.dateTo, "To Date", getCurrentMonthFormatted())
    }

    public async selectSequence(indexNumber: number) {
        await this.click(this.selectors.sequenceSelect, "Sequence", "dropdown")
        const selector = this.page.locator(this.selectors.sequenceOption);
        const sequenceCount = await selector.count();
        const randomIndex = Math.floor(Math.random() * sequenceCount);
       // await this.mouseHover(this.selectors.sequenceOptionIndex(indexNumber), "SequenceOption");
        await this.click(this.selectors.sequenceOptionIndex(indexNumber), "SequenceOption", "Option");
   
    }

    public async editSequencefield(indexNumber: number) {
        await this.click(this.selectors.editSequence, "Sequence", "dropdown")
        const selector = this.page.locator(this.selectors.editSequenceIndex);
        const sequenceCount = await selector.count();
        const randomIndex = Math.floor(Math.random() * sequenceCount);
        await this.click(this.selectors.selectsequenceIndex(indexNumber), "SequenceOption", "Option");
    }
    public async uploadImage() {
        const fileName = "Qeagle"
        const path = `../data/${fileName}.jpg`;
        await this.uploadFile(this.selectors.uploadFile, path);
    }

    public async clickPublish() {
        await this.click(this.selectors.publishButton, "Publish", "Button")
    }

    public async enterbannerUrl() {
        await this.type(this.selectors.bannerUrl, "Banner Url ", FakerData.getMeetingUrl())
    }

    public async clickEditIcon() {
        await this.click(this.selectors.editIcon, "Edit", "Icon")
    }

    public async clickUpdatebtn() {
        await this.click(this.selectors.updatebtn, "Edit", "Icon")
    }

    // public async clickeditBanner(){
    //     await this.click(this.selectors.editBanner,"Edit Banner","Button")
    // }

    public async clickListing() {
        await this.click(this.selectors.bannerListing, "Goto Listing", "Button")
    }


    public async clickUnpublishtab() {
        await this.click(this.selectors.unpublishtab, "unPublish", "Button")
    }

    public async clickDelete() {
        await this.click(this.selectors.deleteIcon, "unPublish", "Button")
        await this.click(this.selectors.confirmDelete, "Delete", "Button")
    }











}