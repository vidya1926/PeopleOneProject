import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()

test(`TC102_CreateCourseForElearning_Recurring_Registration`, async ({ adminHome, createCourse,editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the course as Single Registration` },
        { type: `Test Description`, description: `Verify that course should be created for Single Registration` }
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
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await editCourse.clickBusinessRule();
    await editCourse.verifySingRegchkbox()
    await createCourse.typeDescription("Added Business Rule "+courseName)
    await createCourse.clickUpdate();    
    await createCourse.verifySuccessMessage();
   
    
})


test(`Verification from learner site`, async ({ learnerHome,learnerCourse, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Learner Side Re-Enrollment` },
        { type: `Test Description`, description: `Verify that learner can reenroll the course` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickMoreonCourse(courseName);
    await catalog.clickSelectcourse(courseName);
    await catalog.clickEnroll();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    await learnerCourse.clickReEnroll(2);
    await catalog.clickSelectcourse(courseName);
    await catalog.clickEnroll();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    await catalog.clickMyLearning();
    await catalog.clickCompletedButton()
    await catalog.verifyCompletedCourse(courseName)
    await learnerCourse.verifyRequestClass();
    await learnerCourse.clickRequestClass();
})


  
