import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let domain: any
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test(`Certification with single instance behavior Enrolled tab`, async ({ adminHome, createCourse }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Certification with single instance behavior (Enrolled tab)` },
        { type: `Test Description`, description: `Creating the course and assigning certification with single-instance behavior in the 'Enrolled' tab` }

    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.getCourse();
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    domain = await createCourse.selectPortal();
    console.log(`${domain}`);
    await createCourse.contentLibrary();
    await createCourse.clickHere();
    await createCourse.selectImage();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
})

const title = FakerData.getCourseName();
test(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Certification enroll and completion with single instance` },
        { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
    );

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
    await learningPath.verifyLearningPath();
    await learningPath.clickEditCertification();
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();


})

test(`Login as a learner`, async ({ learnerHome, catalog,dashboard }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Login as a learner` },
        { type: `Test Description`, description: `Verify from learner side` }

    );

    await learnerHome.isSignOutVisible();
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(title);
    await catalog.clickEnrollButton();
    await catalog.clickOkButton();
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.verifyTheEnrolledCertification(title);

    


})