import { BrowserContext, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { URLConstants } from "../constants/urlConstants";
import { EnrollmentPage } from "./EnrollmentPage";


export class InstructorPage extends EnrollmentPage{
   
    public selectors = {
        ...this.selectors,
             instructorMenu:`//span[text()='Instructor']`,
             instFilter:`//button[@id='admin-filters-trigger']`,
             deliveryTypedropdown:`//span[text()='Delivery Type']/following::div[@id='wrapper-search_deliveryType']`,
             deliveryTypeOption:`//span[text()='Delivery Type']/following::div[@class='dropdown-menu show']//a`,
              statusDropdown:`//span[text()='Status']/following::div[@id='wrapper-search_course_status']`,
              statusOption:`//span[text()='Status']/following::div[@class='dropdown-menu show']//a`,
            enrollmentIcon:(course:string)=>`//span[text()='${course}']/following::div[@aria-label="Enrollments"]//i`,
            apply:`//button[text()='Apply']`,
            searchField: "//input[@id='exp-search-field']",
            searchResult:`//div[@id='exp-search-lms-scroll-results']//li`,

            };
    
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    
    async clickInstructor(){
        await this.click(this.selectors.instructorMenu, "Instructor", "Link");
    }
 
    async clickFilter(){
        await this.click(this.selectors.instFilter, "Instructor Filter", "Field");
    }
    

    async selectDeliveryType(deliveryType: string) {
        await this.click(this.selectors.deliveryTypedropdown, "DeliveryType", "dropdown");
        for (const options of await this.page.locator(this.selectors.deliveryTypeOption).all()) {
            const value = await options.innerText();
            console.log(value)
            if (value !== deliveryType) {
                await this.click(`//span[@class='text' and text()='${value}']`, "DeliveryType", "Dropdown");
            }
        }}

        async selectStatus(statusType: string) {
            await this.click(this.selectors.statusDropdown, "DeliveryType", "dropdown");
            for (const options of await this.page.locator(this.selectors.statusOption).all()) {
                const value = await options.innerText();
                console.log(value)
                if (value !== statusType) {
                    await this.click(`//span[@class='text' and text()='${value}']`, "DeliveryType", "Dropdown");
                }
            }
        }

        async clickApply(){
            await this.click(this.selectors.apply,"Apply","Button")
        }

        async entersearchField(data: string) {
            await this.type(this.selectors.searchField, "Search Field", data);
            await this.wait('mediumWait')
            await this.validateElementVisibility(this.selectors.searchResult,"Course Option")
            await this.mouseHover(this.selectors.searchResult,"Course Option")
            await this.click(this.selectors.searchResult,"Course","Option")
        }
    

        async clickEnrollmentIcon(data:string){
            await this.click(this.selectors.enrollmentIcon(data),"Enrollments","Icon")
        }




}    