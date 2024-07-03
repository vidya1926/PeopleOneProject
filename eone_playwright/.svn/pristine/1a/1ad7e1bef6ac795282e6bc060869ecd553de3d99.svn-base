import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";

export class OrganizationPage extends AdminHomePage{
    public selectors = {
        ...this.selectors,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        organizationSubMenu: "//a[text()='Organization']",
        create: "//button[@id='admin-view-btn-primary']",
        enterName: "//input[@id='Name']",
        selectTab: "//label[text()='Type']//following::div[@id='wrapper-Type']",
        selectType: (type: string)=>`//a[@class='dropdown-item']//span[text()='${type}']`,
        description: "//div[@id='Description']//p",
        save: "//button[text()='Save']"
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

    public async enterName(organizationName: string) {
        await this.typeAndEnter(this.selectors.enterName, "Name", organizationName);
    }

    public async clickSelect(){
        await this.click(this.selectors.selectTab, "Select", "Dropdown" );
    }

    public async typeDropdown(data: string) {
        await this.click(this.selectors.selectType(data),"Type",data);
    }

    public async typeDescription(input: string){
        await this.typeAndEnter(this.selectors.description, "Textbox", input);
    }

    public async clickSave() {
        await this.click(this.selectors.save, "Save", "Button")
    }

}
