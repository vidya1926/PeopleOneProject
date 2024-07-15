import { expect } from "playwright/test";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

const title=FakerData.getRandomTitle();
let existingStorage:any;
let updatedStorage:any
test(`Verify the updated Storage Space `, async ({ adminHome, createCourse,contentHome,bannerHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type: `Test Description`, description: `Verify that course should be created for Single instance` }
    );   
    
    await adminHome.loadAndLogin("LEARNERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickContentmenu();
    existingStorage= await contentHome.getContentStorage(); 
    await contentHome.clickCreateContent();
    await contentHome.enter("content-title",title)
    await contentHome.enterDescription("AICC Content for " +title);
    await contentHome.uploadContent("samplevideo.mp4");
    await bannerHome.clickPublish();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage() 
    await contentHome.gotoListing();
    updatedStorage= await contentHome.getContentStorage(); 
    expect(updatedStorage).not.toBe(existingStorage)
    
})
