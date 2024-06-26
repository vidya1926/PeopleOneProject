import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";


const courseName = FakerData.getCourseName();
const description= FakerData.getDescription()
//test.use({ storageState: "logins/expertusAdminLog.json" })
test(`TP Prerequisite Course1 Elearning`, async ({ adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Create the course as multiple instance` },
        { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }

    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickLearningPath();
    await learningPath.clickCreateLearningPath();
    await learningPath.title(courseName);
    await learningPath.language("English");
    await learningPath.description(description);
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.clickCourseCheckBox();
    await learningPath.clickAddSelectCourse();
    await learningPath.clickDetailTab();
    await learningPath.clickCatalogBtn();
    await learningPath.clickUpdateBtn();
    await learningPath.verifyLearningPath();
})


