import path from "path";
import { PlaywrightWrapper } from "../utils/playwright";
import { AdminHomePage } from "./AdminHomePage";
import fs from "fs"
import { count, log } from "console";
import { th } from "@faker-js/faker";

export class LearningPathPage extends AdminHomePage {

    public selectors = {
      ...this.selectors,
     createLearningPathBtn:"//button[text()='CREATE LEARNING PATH']",
     title:"//input[@id='program-title']",
     languageBtn:"(//label[text()='Language']//parent::div//button)[1]",
     language:(data:string)=>`//a//span[text()='${data}']`,
     description:"//div[@id='program-description']//p",
     saveBtn:"//button[@id='program-btn-save']",
     proceedBtn:"//button[text()='Yes, Proceed']",
     addCourseBtn:"//button[text()=' Add Course']",
     addCourseCheckBox:"//i[contains(@class,'fa-duotone fa-square icon')]",
     checkBox:(index:string)=>`(//i[contains(@class,'fa-duotone fa-square icon')])[${index}]`,
     addSelectedCourseBtn:"//button[text()='Add Selected Course']",
     detailsTab:"//button[text()='Details']",
     catalogBtn:"//label[@for='publishedcatalog']/i[contains(@class,'fa-circle icon')]",
     updateBtn:"//button[text()='Update']",
     successMessage: "//div[@id='lms-overall-container']//h3"
              
    };
async clickCreateLearningPath(){
    await this.validateElementVisibility(this.selectors.createLearningPathBtn,"Learning Path");
    await this.click(this.selectors.createLearningPathBtn,"Learning Path","Button");
}

async title(data:string){
await this.validateElementVisibility(this.selectors.title,"Title");
await this.type(this.selectors.title,"Title",data);
}

async language(data:string){
    await this.click(this.selectors.languageBtn,"Language","Button");
    await this.click(this.selectors.language(data),"Language","Button");
}

async description(data:string){
    await this.type(this.selectors.description,"Description",data)
}

async clickSave(){
    await this.click(this.selectors.saveBtn,"Save","Button");
}

async clickProceedBtn(){
    await this.validateElementVisibility(this.selectors.proceedBtn,"Proceed Button");
    await this.click(this.selectors.proceedBtn,"Proceed Button","Button");
}

async clickAddCourse(){
    await this.validateElementVisibility(this.selectors.addCourseBtn,"Add Course Button");
    await this.click(this.selectors.addCourseBtn,"Add Course Button","Button");
}

async clickCourseCheckBox(){
    const count = await this.page.locator(this.selectors.addCourseCheckBox).count();
    function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomNumber =  getRandomNumber(2, count);
 await this.click(this.selectors.checkBox(randomNumber),"Add Course CheckBox","ChexkBox");
}

async clickAddSelectCourse(){
    await this.click(this.selectors.addSelectedCourseBtn,"Add Select Course","Button")
    await this.validateElementVisibility("//span[@class='text-truncate']","Populated Text");
    const text= await this.page.innerText("//span[@class='text-truncate']");
    console.log("Selected Course =" + text);
}

async clickDetailTab(){
    await this.mouseHover(this.selectors.detailsTab,"Details");
    await this.click(this.selectors.detailsTab,"Details","Button");
}

async clickCatalogBtn(){
    await this.mouseHover(this.selectors.catalogBtn,"Show Catalog");
    await this.click(this.selectors.catalogBtn,"Show Catalog","Button");
}

async clickUpdateBtn(){
    await this.mouseHover(this.selectors.updateBtn,"Update");
    await this.click(this.selectors.updateBtn,"Update","Button");
    await this.spinnerDisappear();
}

async verifyLearningPath() {
    await this.verification(this.selectors.successMessage,"Published successfully.");
}

}