import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData } from "../utils/fakerUtils";

export class OrganizationPage extends AdminHomePage{
    
    public selectors = {
        ...this.selectors,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        organizationSubMenu: "//a[text()='Organization']",
        create: "//button[@id='admin-view-btn-primary']",
        enterName: "//input[@id='Name']",
        selectTab: "//label[text()='Type']//following::div[@id='wrapper-Type']",
        selectType: (index: number)=>`(//a[@class='dropdown-item']//span)[${index}]`,
        description: "//div[@id='Description']//p",
        save: "//button[text()='Save']",
        editOrganization:`//a[text()='Edit Organization']`,
        contactName:`//input[@id='ContactName']`,
        updateBtn:`//button[text()='Update']`,
        orgeditIcon:`//i[contains(@class,'fa-duotone fa-pen ')]`,
        parentOrg:`//input[@id='ParentOrg-filter-field']`,
        childCount:`//span[contains(text(),'Child Organizations')]`

    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async menuButton() {
        await this.page.waitForLoadState('load');
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.menu, "Menu");
        await this.click(this.selectors.menu, "Menu", "Button");
    }

    public async people() {
        await this.validateElementVisibility(this.selectors.peopleMenu, "People");
        await this.click(this.selectors.peopleMenu, "People", "Button");
    }

    public async organizationMenu() {
        await this.click(this.selectors.organizationSubMenu, "Organization", "Link");
    }

    public async createOrganization() {
        await this.click(this.selectors.create, "Create Organization", "Button");
    }

    public async childOrgCount() {
     return await this.getInnerText(this.selectors.childCount);
    }

    public async enterName(orgName:string) {
        await this.typeAndEnter(this.selectors.enterName, "Name",orgName);
    }

    public async typeDropdown() {
        await this.click(this.selectors.selectTab, "Select", "Dropdown" );
        const count=await this.page.locator("//a[@class='dropdown-item']//span").count()
        const randomIndex = Math.floor(Math.random() * count) + 1;
        await this.click(this.selectors.selectType(randomIndex),"Type","dropdown");
    }

    public async typeDescription(){
        await this.typeAndEnter(this.selectors.description, "Textbox", FakerData.getDescription());
    }

    public async clickSave() {
        await this.click(this.selectors.save, "Save", "Button")
    }

    public async clickEditOrg(){
        await this.click(this.selectors.editOrganization,"Edit ","Button")

    }

    
    public async clickEditIcon(){
        await this.click(this.selectors.orgeditIcon,"Edit ","Icon")

    }


    public async enterParentOrg(orgName:string){
        await this.type(this.selectors.parentOrg,"ParentOrg",orgName )
    }



    public async enterContactName(){
        await this.type(this.selectors.contactName,"ContactName", FakerData.getFirstName())
    }

    
    public async clickUpdate(){
        await this.click(this.selectors.updateBtn,"Update","Button")
    }




}
