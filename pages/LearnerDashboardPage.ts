import { FakerData, getCurrentDateFormatted } from "../utils/fakerUtils";

import { BrowserContext, Locator, Page } from "@playwright/test";
import { LearnerHomePage } from "./LearnerHomePage";
import { th } from "@faker-js/faker";

export class LearnerDashboardPage extends LearnerHomePage {

    public selectors = {
        ...this.selectors,
        learningPathAndCertification: "//div[@id='mydashboard']//div[text()='Learningpath / Certification']",
        certification: "a:text-is('Certification')",
        certificationInput: "#exp-searchundefined input",
        verifyText: (titleName: string) => `//div[text()='${titleName}']`,
        recertifyIcon: (course: string) => `//div[text()='${course}']//following::i[contains(@class,'certificate')]`,
        pendingLabel: "//span[contains(text(),'Pending')]",
        verifyPendingCourse: (course: string) => `//span[contains(text(),'Pending')]//following::div[contains(text(),'${course}')]`

    }

    async clickLearningPath_And_Certification() {
        await this.wait('minWait');
        await this.validateElementVisibility(this.selectors.learningPathAndCertification, "LearningPath and Certification");
        await this.wait('minWait');
        await this.click(this.selectors.learningPathAndCertification, "LearningPath and Certification", "Button");
    }

    async clickCertificationLink() {
        await this.page.waitForLoadState('load');
        await this.validateElementVisibility(this.selectors.certification, "Certification");
        await this.wait('mediumWait');
        await this.click(this.selectors.certification, "Certification", "Link");
        await this.wait('mediumWait');
    }

    async clickRecertifyIcon(data: string) {
        await this.mouseHover(this.selectors.recertifyIcon(data), "Recertify Icon");
        await this.click(this.selectors.recertifyIcon(data), "Recertify Icon", "Icon")
    }

    async searchCertification(data: string) {
        await this.validateElementVisibility(this.selectors.certificationInput, "Search Field");
        await this.wait('mediumWait');
        await this.typeAndEnter(this.selectors.certificationInput, "Search Field", data);
    }

    async verifyTheEnrolledCertification(data: string) {
        await this.validateElementVisibility(this.selectors.verifyText(data), "Certification");
        await this.verification(this.selectors.verifyText(data), data);
    }

    async pendingTab(course: string) {
        await this.wait('mediumWait');
        //await this.mouseHover(this.selectors.pendingLabel, "Pending");
        await this.fillAndEnter(this.selectors.certificationInput, "Input", course);
        await this.validateElementVisibility(this.selectors.pendingLabel, "Pending");;
        await this.verification(this.selectors.verifyPendingCourse(course), course)
    }


}