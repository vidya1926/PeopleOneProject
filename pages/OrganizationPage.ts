import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData } from "../utils/fakerUtils";

export class OrganizationPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        organizationSubMenu: "//a[text()='Organization']",
        create: "//button[@id='admin-view-btn-primary']",
        enterName: "//input[@id='Name']",
        selectTab: "//label[text()='Type']//following::div[@id='wrapper-Type']",
        selectType: (index: number) => `(//a[@class='dropdown-item']//span)[${index}]`,
        description: "//div[@id='Description']//p",
        save: "//button[text()='Save']",
        editOrganization: `//a[text()='Edit Organization']`,
        contactName: `//input[@id='ContactName']`,
        updateBtn: `//button[text()='Update']`,
        orgeditIcon: `(//i[contains(@class,'fa-duotone fa-pen ')])[1]`,
        parentOrg: `//input[@id='ParentOrg-filter-field']`,
        selectParentOrg: `(//div[@id='ParentOrg-filter-results-container']//li)[1]`,
        childCount: (fieldName: string) => `//div[text()='${fieldName}.com']/following::span[contains(text(),'Child Organizations')][1]`,
        loadMore: `//button[text()='Load More']`,
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

    public async enterName(orgName: string) {
        await this.typeAndEnter(this.selectors.enterName, "Name", orgName + "Co");
    }

    public async typeDropdown() {
        await this.click(this.selectors.selectTab, "Select", "Dropdown");
        const count = await this.page.locator("//a[@class='dropdown-item']//span").count()
        const randomIndex = Math.floor(Math.random() * count) + 1;
        await this.click(this.selectors.selectType(randomIndex), "Type", "dropdown");
    }

    public async typeDescription() {
        await this.typeAndEnter(this.selectors.description, "Textbox", FakerData.getDescription());
    }

    public async clickSave() {
        await this.click(this.selectors.save, "Save", "Button")
    }

    public async clickEditOrg() {
        await this.click(this.selectors.editOrganization, "Edit ", "Button")

    }
    public async clickEditIcon() {
        await this.click(this.selectors.orgeditIcon, "Edit ", "Icon")

    }

    public async childOrgCount(fdname: string) {
        for (let i = 0; i <= 1; i++) {
            await this.click(this.selectors.loadMore, "LoadMore", "Button")
        }
        const org = await this.getInnerText(this.selectors.childCount(fdname));
        console.log(org)
        const orgName = org.split(":")
        return parseInt(orgName[1])
    }
    public async enterParentOrg(orgName: string) {
        await this.type(this.selectors.parentOrg, "ParentOrg", orgName)
        await this.validateElementVisibility(this.selectors.selectParentOrg, "parentOrgName")
        await this.click(this.selectors.selectParentOrg, "parentOrgName", "Option")

    }
    public async enterContactName() {
        await this.validateElementVisibility(this.selectors.contactName, "ContactName");
        await this.type(this.selectors.contactName, "ContactName", FakerData.getFirstName());
    }
    public async clickUpdate() {
        await this.click(this.selectors.updateBtn, "Update", "Button")
    }




}
