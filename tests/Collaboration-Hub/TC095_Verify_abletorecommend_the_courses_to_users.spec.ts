import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()

test(`CreateCourseFor Single Instance`, async ({ adminHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type: `Test Description`, description: `Verify that course should be created for Single instance` }
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
    await createCourse.contentLibrary()
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
})


test(`Verify the manager can recommend the course to user`,async({learnerHome,managerHome})=>{
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Manager verification` },
        { type: `Test Description`, description: `Verify the manager can recommend the course to user` }
    );
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.selectCollaborationHub();
    await managerHome.enterSearchCourse(courseName);
    await managerHome.clickrecommendIcon(courseName)
    await managerHome.verifydirectandIndirect("Direct")
    await managerHome.verifydirectandIndirect("Virtual")
    await managerHome.enterAdditionalInfo()
    await managerHome.clickSendMeCopy()
    await managerHome.clickRecommendLearning()
    await managerHome.verifytoastmsg()
})


test("Learner Site verification",async({learnerHome,catalog,dashboard})=>{
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );    
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.verifyCompletedCourse(courseName)

})