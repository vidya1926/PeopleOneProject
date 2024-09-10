import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";
import data from "../../data/adminGroupsData.json"
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



const title = FakerData.getCourseName();
test(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Certification enroll and completion with single instance` },
        { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
    await learningPath.title(title);
    await learningPath.description(description);
    await learningPath.language();
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(courseName);
    await learningPath.clickAddSelectCourse();
    await learningPath.clickDetailTab();
    await learningPath.clickCatalogBtn();
    await learningPath.clickUpdateBtn();
    await learningPath.verifySuccessMessage();
    await learningPath.clickEditCertification();
    // await learningPath.getCodeValue();
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
})

test(`Verify the manager can recommend the course to user`, async ({ learnerHome, managerHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Manager verification` },
        { type: `Test Description`, description: `Verify the manager can recommend the course to user` }
    );
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.selectCollaborationHub();
    await createCourse.clickCatalog();
    await managerHome.enterSearchCourse("Online Bus Calculate");
    await managerHome.clickrecommendIcon("Online Bus Calculate")
    await managerHome.enterAdditionalInfo()
    await managerHome.selectTeam()
    await managerHome.selectTeamUser(data.teamUser2)
    await managerHome.clickSendMeCopy()
    await managerHome.clickRecommendLearning()
    await managerHome.verifytoastmsg()
})


test("Learner Site verification", async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );
    await learnerHome.learnerLogin("TEAMUSER2", "DefaultPortal");
    await learnerHome.clickCatalog();
    await catalog.clickRecommendation();
    await catalog.searchCatalog(title);
    await catalog.verifyCourserecommemnded(title);

})