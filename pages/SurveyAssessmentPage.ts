import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData, score } from "../utils/fakerUtils";

export class SurveyAssessmentPage extends AdminHomePage {

  public selectors = {
    ...this.selectors,
    createQuestionBtn: "//button[text()='Create Question']",
    createSurveyBtn: "//button[text()='CREATE SURVEY']",
    questionsInput: "//label[text()='Questions']/following-sibling::input",
    languageBtn: "(//label[text()='Language']/parent::div//button)[1]",
    language: (language: string) => `//div[@class='dropdown-menu show']//span[text()='${language}']`,
    typeBtn: "(//label[text()='Type']/parent::div//button)[1]",
    typeItem: "//label[text()='Type']/following-sibling::div//a[contains(@class,'dropdown-item')]",
    //typeItem:(dropdownItem:string)=>`(//label[text()='Type']/following-sibling::div//a[contains(@class,'dropdown-item')])${dropdownItem}`,
    typeValue: "//label[text()='Type']/parent::div//button//div[@class='filter-option-inner-inner']",
    displayOptionBtn: "(//label[text()='Display Options']/parent::div//button)[1]",
    displayOptionList: "//label[text()='Display Options']/parent::div//a[@class='dropdown-item']",
    option1Input: "//label[text()='Option 1']/parent::div/following-sibling::input",
    option2Input: "//label[text()='Option 2']/parent::div/following-sibling::input",
    row1Input: "//label[text()='Row 1']/parent::div/following-sibling::input",
    row2Input: "//label[text()='Row 2']/parent::div/following-sibling::input",
    saveBtn: "//button[text()='Save' and @id='question-btn-save']",
    scoreInput: "(//label[text()='Score']/following-sibling::input)[1]",
    radioBtn: "//label[contains(text(),'Option')]/parent::div//i[contains(@class,'fa-circle icon')]",
    checkBoxBtn: "(//label[contains(text(),'Option')]/parent::div//i[contains(@class,'fa-square icon')])[1]",
    imageInput: `//input[@id='question_upload_file_opt']`,
    survelTitle: "//label[text()='Survey Title']//following-sibling::input",
    descriptionInput: "//div[@id='assessment-description']//p",
    saveDraftBtn: "//button[text()='Save Draft']",
    proceedBtn: "//button[text()='Yes, Proceed']",
    importQuestionIcon: "//i[contains(@id,'import')]",
    questionType: "//div[text()='Question Type']",
    questionLibCheckbox: "//div[contains(@id,'queslib-list')]//i[contains(@class,'fa-square icon')]",
    addSelectedQuestionBtn: "//button[text()='Add Selected Questions']",
    importQuestionBtn: "//button[text()='Import Questions']",
    publishBtn: "//button[text()='Publish']",
    successfullMessage: "//div[@id='lms-overall-container']//h3",
    createAssessment:`//button[text()='CREATE ASSESSMENT']`,
    assessmentTitle: `//label[text()='Assessment Title']//following-sibling::input`,
    passPercentage: `//input[@id='pass_percentage']`,
    randomizedropdown: `(//label[text()='Randomize']/following::button)[1]`,
    randomizeOption: (option: string) => `(//a/span[text()='${option}'])`,
    noOfAttempts: `//input[@id='attempts']`

  }
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }
  async clickCreateSurvey() {
    await this.validateElementVisibility(this.selectors.createSurveyBtn, "Survey");
    await this.click(this.selectors.createSurveyBtn, "Survey", "Button");
  }

  async clickCreateAssessment() {
    await this.validateElementVisibility(this.selectors.createAssessment, "Survey");
    await this.click(this.selectors.createAssessment, "Survey", "Button");
  }
  async clickCreateQuestions() {
    await this.validateElementVisibility(this.selectors.createQuestionBtn, "Questions");
    await this.click(this.selectors.createQuestionBtn, "Questions", "Button");
  }

  async enterQuestions() {
    await this.type(this.selectors.questionsInput, "Input", FakerData.generateQuestion());
  }

  async selectLanguage() {
    let pickedLanguage = "English"
    await this.click(this.selectors.languageBtn, "Language", "Button");
    await this.click(this.selectors.language(pickedLanguage), "Language", "DropDown");
  }


  async selectingType() {
    await this.click(this.selectors.typeBtn, "Type", "Button")
    const itemXpath = this.selectors.typeItem;
    const count = await this.page.locator(itemXpath).count();
    const randomIndex = Math.floor(Math.random() * count) + 1;

    await this.click(`(${itemXpath})[${randomIndex}]`, "List", "List");

    const typeValue = await this.getInnerText(this.selectors.typeValue);
    console.log("Select type is " + typeValue);
    const scoreInput = this.page.locator(this.selectors.scoreInput);

    switch (typeValue) {
      case "Radio Button":
        await this.type(this.selectors.option1Input, "Input", FakerData.getRandomTitle());
        await this.type(this.selectors.option2Input, "Input", FakerData.getRandomTitle());

        if (await scoreInput.isVisible()) {
          await this.type(this.selectors.scoreInput, "Score", await score())
          const radioBtn = this.page.locator(`(${this.selectors.radioBtn})[${1}]`);
          await radioBtn.click();
        }

        break;

      case "Checkbox":

        await this.type(this.selectors.option1Input, "Input", FakerData.getRandomTitle());
        await this.type(this.selectors.option2Input, "Input", FakerData.getRandomTitle());

        if (await scoreInput.isVisible()) {
          await this.type(this.selectors.scoreInput, "Score", await score());
          const checkBoxCount = await this.page.locator(this.selectors.checkBoxBtn).count();
          const checkBoxBtn = this.page.locator(`(${this.selectors.checkBoxBtn})[${1}]`);
          await checkBoxBtn.click();
        }
        break;

      case "Dropdown":

        await this.type(this.selectors.option1Input, "Input", FakerData.getRandomTitle());
        await this.type(this.selectors.option2Input, "Input", FakerData.getRandomTitle());

        if (await scoreInput.isVisible()) {
          await this.type(this.selectors.scoreInput, "Score", await score());
          const radioCount = await this.page.locator(this.selectors.radioBtn).count();
          const radioBtn = this.page.locator(`(${this.selectors.radioBtn})[${1}]`);
          await radioBtn.click();
        }
        break;

      case "Grid/Matrix - Checkbox":

        await this.type(this.selectors.row1Input, "Input", FakerData.getRandomTitle());
        await this.type(this.selectors.row2Input, "Input", FakerData.getRandomTitle());
        await this.type(this.selectors.option1Input, "Input", FakerData.getRandomTitle());
        await this.type(this.selectors.option2Input, "Input", FakerData.getRandomTitle());
        break;

      case "Short answer":
        // Add implementation here
        break;

      case "Paragraph":
        // Add implementation here
        break;

      case "Like/Dislike":
        // Add implementation here
        break;

      case "Overall rating":
        // Add implementation here
        break;

      case "Image - Radio Button":

        if (await scoreInput.isVisible()) {
          await this.type(this.selectors.scoreInput, "Score", await score());
          //const radioCount = await this.page.locator(this.selectors.radioBtn).count();
          const radioBtn = this.page.locator(`(${this.selectors.radioBtn})[${1}]`);

          const count = await this.page.locator(this.selectors.imageInput).count();
          for (let index = 0; index <= count; index++) {
            const qa = "../data/Q1.jpg"
            await this.uploadFile(this.selectors.imageInput, qa);
            await this.wait('mediumWait');
          }

        }
        break;

      case "Image - Checkbox":

        if (await scoreInput.isVisible()) {
          await this.type(this.selectors.scoreInput, "Score", await score());
          // const checkBoxCount = await this.page.locator(this.selectors.checkBoxBtn).count();
          const checkBoxBtn = this.page.locator(`(${this.selectors.checkBoxBtn})[${1}]`);
          await checkBoxBtn.click();
          const count = await this.page.locator(this.selectors.imageInput).count();
          for (let index = 0; index <= count; index++) {
            const qa = "../data/Q1.jpg"
            await this.uploadFile(this.selectors.imageInput, qa);
            await this.wait('mediumWait');
          }
        }
        break;

      default:
        console.error("Unknown button type:", typeValue);
    }

  }

  async displayOption() {
    if (await this.page.isVisible(this.selectors.displayOptionBtn)) {
      await this.click(this.selectors.displayOptionBtn, "Display Option", "Button");

      const dropdownList = this.selectors.displayOptionList
      const count = await this.page.locator(dropdownList).count();
      const randomIndex = Math.floor(Math.random() * count) + 1;
      await this.click(`(${dropdownList})[${randomIndex}]`, "List", "List");

    }
    else {
      console.log("Element not found")
    }
  }
  async fillSurveyTitle(data: string) {
    await this.type(this.selectors.survelTitle, "Title", data);
  }


  async fillAssessmentTitle(data: string) {
    await this.type(this.selectors.assessmentTitle, "Title", data);
  }

  async fillDescription() {
    await this.type(this.selectors.descriptionInput, "Description", FakerData.getDescription());
  }

  async importQuestion() {
    await this.page.waitForLoadState('load');
    await this.mouseHover(this.selectors.importQuestionIcon, "Import");
    await this.wait('minWait');
    await this.click(this.selectors.importQuestionIcon, "Import", "Idiomatic Text");
    await this.mouseHover(this.selectors.questionType, "Question Type");
    let checkBox = this.selectors.questionLibCheckbox;
    let count = await this.page.locator(checkBox).count();
    let generatedNumbers: number[] = [];
    for (let i = 0; i < 4; i++) {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * count) + 1;
      } while (generatedNumbers.includes(randomIndex));
      generatedNumbers.push(randomIndex);
      await this.click(`(${checkBox})[${randomIndex}]`, "Questions", "Checkbox");
    }
    await this.wait("minWait");
  }

  async clickAddSelectedQuestion() {
    await this.mouseHover(this.selectors.addSelectedQuestionBtn, "Add Selected Question");
    await this.click(this.selectors.addSelectedQuestionBtn, "Add Selected Question", "Button");
  }

  async clickImportQuestion() {
    await this.mouseHover(this.selectors.importQuestionBtn, "Import Question");
    await this.click(this.selectors.importQuestionBtn, "Import Question", "Button");
  }


  async enterPasspercentage(data: string) {
    await this.type(this.selectors.passPercentage, "Pass Percentage", data)
  }


  async selectRandomizeOption(option: string) {
    await this.click(this.selectors.randomizedropdown, "Randomize", "Dropdown")
    await this.click(this.selectors.randomizeOption(option), "Randomize ", "option")
  }

  async enterNofAttempts(data: string) {
    await this.type(this.selectors.noOfAttempts, "No. Of Attempts", data)
  }

  async clickPublish() {
    //await this.validateElementVisibility(this.selectors.publishBtn, "Publish")
    //await this.wait("maxWait")
    await this.mouseHover(this.selectors.publishBtn, "Publish");
    await this.click(this.selectors.publishBtn, "Publish", "Button");
  }

  async clickSaveDraft() {
    await this.click(this.selectors.saveDraftBtn, "Save", "Button");
    await this.spinnerDisappear();
  }

  async clickProceed() {
    await this.click(this.selectors.proceedBtn, "Save", "Button");
    await this.spinnerDisappear();
  }

  async clickSave() {
    await this.click(this.selectors.saveBtn, "Save", "Button");
    await this.spinnerDisappear();
  }

  async verifySuccessMessage() {
    await this.spinnerDisappear();
    await this.verification(this.selectors.successfullMessage, "successfully");
  }

}