import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";


const courseName = FakerData.getCourseName();
const description= FakerData.getDescription();
//test.use({ storageState: "logins/expertusAdminLog.json" })
test.skip(`TC060_TP_Prerequisite_Course1_Elearning`, async ({ adminHome, createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `TP Prerequisite Course1 Elearning` },
        { type: `Test Description`, description: `Verify that course should be created successfully` }

    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + description);
    await createCourse.uploadVideoThroughLink();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
   
})


    // await adminHome.clickLearningPath();
    // await learningPath.clickCreateLearningPath();
    // await learningPath.title(courseName);
    // await learningPath.language("English");
    // await learningPath.description(description);
    // await learningPath.clickSave();
    // await learningPath.clickProceedBtn();
    // await learningPath.clickAddCourse();
    // await learningPath.clickCourseCheckBox(courseName);
    // await learningPath.clickAddSelectCourse();
    // await learningPath.clickDetailTab();
    // await learningPath.clickCatalogBtn();
    // await learningPath.clickUpdateBtn();
    // await learningPath.verifyLearningPath();